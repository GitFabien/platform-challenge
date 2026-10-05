# DevOps Platform Challenge — Starter

This is the intentionally defective starter repository.

Run locally:

```bash
npm install
npm test
npm start
```

The application listens on port 3000.

**Important:** the repository is intentionally incomplete from a DevOps-platform perspective. Students must implement the GitHub workflow, CI/CD, Docker registry publishing, Terraform validation, documentation, and quality gates described in the challenge brief.


===================================================================================================================================================================================================================

# DevOps Platform Challenge

A small Node.js application used as a DevOps platform challenge. The project demonstrates a complete engineering workflow: issue tracking, branch-based development, CI validation, containerization, and Terraform validation without connecting to a real cloud provider.

## Project purpose

This repository is designed to simulate a realistic software delivery workflow for a four-student team. The objective is to:

- fix an intentionally broken application
- work with GitHub Issues and pull requests
- validate code with CI
- build and run the app in Docker
- publish a container image to GitHub Container Registry
- validate Terraform configuration locally in CI
- maintain a professional repository workflow and documentation

## Architecture

The application is a lightweight Express API with a few endpoints for health and task-related logic.

```text
┌──────────────────────┐
│   Developer / Team   │
│  GitHub Issues      │
│  Branches / PRs      │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│  GitHub Actions CI   │
│  - Node.js tests     │
│  - Docker build      │
│  - Terraform validate│
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│   Node.js App        │
│   Express API        │
│   Port 3000          │
└───────────┬──────────┘
            │
            ▼
┌──────────────────────┐
│   Docker Container   │
│   Runs app locally   │
└──────────────────────┘
```

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       ├── node-ci.yml
│       ├── docker.yml
│       └── terraform.yml
├── src/
│   └── app.js
├── terraform/
│   ├── main.tf
│   └── README.md
├── Dockerfile
├── .dockerignore
├── package.json
├── README.md
├── STUDENT_CHALLENGE.md
└── ...
```

## Local setup

### Prerequisites

- Node.js 18 or later
- npm
- Docker (for container validation)
- Terraform 1.5.0 or later

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

### Start the application

```bash
npm start
```

The app listens on port `3000`.

### Health check

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{ "status": "healthy" }
```

## Tests

The repository uses Node.js built-in test runner.

Run:

```bash
npm test
```

This validates the application behavior and ensures regressions are caught during CI.

## Docker usage

### Build the Docker image

```bash
docker build -t devops-platform-challenge .
```

### Run the container

```bash
docker run --rm -p 3000:3000 devops-platform-challenge
```

Then verify:

```bash
curl http://localhost:3000/health
```

## CI/CD overview

GitHub Actions is used to automate validation and deployment-related checks:

- Node.js test workflow verifies the application logic
- Docker workflow builds the image and pushes it to GitHub Container Registry
- Terraform workflow validates configuration without provisioning cloud resources

This helps ensure that each code change is verified before being merged.

## Terraform explanation

This project includes a Terraform configuration under the `terraform/` directory. The goal is not to deploy infrastructure to a cloud provider, but to validate that the configuration is correct and follows Terraform conventions.

### Files

- `terraform/main.tf` defines:
  - required Terraform version
  - application name variable
  - a local environment value
  - a metadata output

### Local validation commands

```bash
cd terraform
terraform fmt -check
terraform init
terraform validate
```

### Why no cloud provider?

The challenge states there is no cloud provider connection. This means the Terraform workflow validates configuration only and does not attempt a real deployment or authentication to any external service.

## Development workflow

The team follows a structured GitHub workflow:

1. Create or pick an issue
2. Create a feature/fix branch
3. Implement the change
4. Open a pull request
5. Review and discuss the code
6. Require approval before merge
7. Ensure CI checks pass
8. Merge to `main`

## Useful commands

```bash
npm install
npm test
npm start
docker build -t devops-platform-challenge .
docker run --rm -p 3000:3000 devops-platform-challenge
cd terraform && terraform fmt -check && terraform init && terraform validate
```

## Team responsibilities

This challenge is designed for 4 students, with responsibilities distributed as:

- GitHub workflow and branch protection
- Node.js application fix and CI
- Docker image build and container pipeline
- Terraform validation and documentation

## Conclusion

This project demonstrates a practical DevOps workflow from code to container to infrastructure validation. The focus is not just on writing code, but on building a disciplined engineering process that promotes quality, review, automation, and repeatability.
