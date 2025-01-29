import * as cdk from "aws-cdk-lib";

export interface DevopsProps extends cdk.StackProps {
    repoName: string;
}