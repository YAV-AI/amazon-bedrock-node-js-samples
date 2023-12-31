# Amazon Bedrock Node.js Samples

This repository contains Node.js examples to get started with the Amazon Bedrock service.

## Installation

```bash
yarn
```

or

```bash
npm install
```

## Configuration

Ensure you have properly configured your AWS credentials and region to use the AWS SDK for JavaScript. You can do this using various methods, such as:

### AWS CLI:

Use the `aws configure` command to set up your AWS credentials.

### Setting Credentials in Node.js:

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html

### IAM Roles:

If your application is running on an AWS resource with an associated IAM role, it will inherit permissions and credentials from that role.

## Run an example

```bash
node text/claude.mjs
```

```bash
node image/stable-diffusion-simple.mjs
```

## Further reading

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock/
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/
