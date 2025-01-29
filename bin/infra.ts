#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";
import { DevopsProps } from "../lib/interfaces/interfaces";

const app = new cdk.App();
const devArch = new InfraStack(app, "InfraStack", {
  env: { account: process.env.AccountId, region: "us-east-1" },
  repoName: `${process.env.repoName ?? "cuper-mobile-reciclaje"}`,
});

cdk.Tags.of(app).add("environment", `${process.env.ENV ?? "prod"}`);
cdk.Tags.of(app).add(
  "project",
  `${process.env.PROJECT_NAME ?? "cuper-mobile"}`
);
