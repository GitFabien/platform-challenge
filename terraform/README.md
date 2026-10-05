# Terraform validation exercise

This Terraform configuration deliberately does not declare a cloud provider.

The challenge is to validate and format the configuration only.

Do not add cloud credentials or attempt to provision cloud resources.

====================================================================================================================================

# Terraform validation

This directory contains the Terraform configuration used to validate infrastructure code in CI.

## Purpose

The challenge requires Terraform to be validated locally in GitHub Actions without connecting to any cloud provider. The purpose is to ensure:

- the configuration is valid HCL
- formatting is correct
- initialization succeeds
- validation passes without credentials

## Files

- `main.tf` - Terraform configuration
- `README.md` - documentation for the Terraform exercise

## Current configuration

The Terraform configuration declares:

- a required Terraform version of `>= 1.5.0`
- an `application_name` variable
- a local environment value
- metadata output for application information

This configuration is intentionally simple and does not define a cloud provider, because no actual deployment is required for this challenge.

## Local validation

Run the following commands:

```bash
cd terraform
terraform fmt -check
terraform init
terraform validate
```

## CI behavior

The GitHub Actions workflow runs the same commands on pull requests and pushes to `main` when Terraform files are changed. This ensures the repository remains valid and avoids broken infrastructure definitions.
