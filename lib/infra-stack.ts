import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import * as iam from "aws-cdk-lib/aws-iam";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as path from "path";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as kms from "aws-cdk-lib/aws-kms";
import { DevopsProps } from "./interfaces/interfaces";

export class InfraStack extends cdk.Stack {
  public readonly repoName: string;
  public readonly roleName: string;

  constructor(scope: Construct, id: string, props: DevopsProps) {
    super(scope, id, props);

    //Pipeline
    const pipeline = new codepipeline.Pipeline(this, "DevPipeline", {
      crossAccountKeys: false,
      restartExecutionOnUpdate: true,
    });

    const sourceOutput = new codepipeline.Artifact();

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new codepipelineActions.CodeCommitSourceAction({
          actionName: "CodeCommit",
          repository: codecommit.Repository.fromRepositoryName(
            this,
            "Repo",
            props.repoName
          ),
          output: sourceOutput,
          branch: "main",
        }),
      ],
    });

    //Build image
    const dockerImageAsset = codebuild.LinuxBuildImage.fromAsset(
      this,
      "DockerImageAsset",
      {
        directory: path.join(__dirname, "../../codigo", "reciclaje"),
        assetName: "reciclaje-apk-builder",
      }
    );

    const variablesSecret = new secretsmanager.Secret(
      this,
      "EnvironmentVariablesSecret"
    );

    const codebuildProject = new codebuild.PipelineProject(
      this,
      "AppCodeBuild",
      {
        environment: {
          environmentVariables: {
            S3BUCKET: {
              value: pipeline.artifactBucket.bucketName,
            },
            SECRETS: {
              value: variablesSecret.secretArn,
              type: codebuild.BuildEnvironmentVariableType.SECRETS_MANAGER,
            },
          },
          buildImage: dockerImageAsset,
          computeType: codebuild.ComputeType.MEDIUM,
        },

        buildSpec: codebuild.BuildSpec.fromObjectToYaml({
          version: "0.2",
          phases: {
            install: {
              commands: [
                "echo Installing flutter dependencies",
                "pwd",
                'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"',
                "unzip awscliv2.zip",
                "./aws/install",                
                "cd codigo/reciclaje",                
                "flutter pub get",
              ],
            },
            build: {
              commands: [
                "echo Building flutter App",
                "flutter build apk --release",
              ],
            },
            post_build: {
              commands: [
                "ls",
                "cd build/app/outputs/flutter-apk",
                "KEY=\"build/$(date +'%Y%m%d-%H%M')-app-release.apk\"",
                "aws s3 cp app-release.apk s3://$S3BUCKET/$KEY",
                "SIGNED_URL=$(aws s3 presign s3://$S3BUCKET/$KEY --expires-in 604800)",
              ],
            },
          },

          // cache: {
          //   paths: [`/root/.cache`],
          // },
          artifacts: {
            files: ["codigo/reciclaje/build/app/outputs/flutter-apk/app-release.apk"],
            "discard-paths": "yes",
          },
        }),
      }
    );

    codebuildProject.role?.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
    );
    variablesSecret.grantRead(codebuildProject);

    // Acción de construcción en CodePipeline
    const buildOutput = new codepipeline.Artifact();

    pipeline.addStage({
      stageName: "Build",
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: "AndroidBuild",
          input: sourceOutput,
          project: codebuildProject,
          outputs: [buildOutput],
        }),
      ],
    });
  }
}
