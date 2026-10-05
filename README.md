# DevOps Platform Challenge — Task Management Service

A lightweight, robust Node.js microservice demonstrating end-to-end DevOps and Platform Engineering practices: structured GitHub collaboration, static analysis with ESLint, native automated testing, containerization with Docker, CI/CD pipeline automation via GitHub Actions, and declarative Infrastructure as Code (IaC) verification with HashiCorp Terraform.

---

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [Architecture](#architecture)
3. [Repository Structure](#repository-structure)
4. [Prerequisites](#prerequisites)
5. [Local Setup](#local-setup)
6. [API Endpoints](#api-endpoints)
7. [Running Tests & Quality Checks](#running-tests--quality-checks)
8. [Docker Usage](#docker-usage)
9. [CI/CD Automation](#cicd-automation)
10. [Terraform (Infrastructure as Code)](#terraform-infrastructure-as-code)
11. [Development Workflow & Quality Gates](#development-workflow--quality-gates)
12. [Useful Commands](#useful-commands)

---

## Project Purpose

The primary objective of this project is to showcase a production-grade software delivery lifecycle (SDLC) based on standard industry principles:

- **Reliable Web API**: A RESTful Express.js service providing health monitoring and in-memory task management (`GET`, `POST`, `PATCH`).
- **Strict Quality Gates**: Zero-dependency automated test runner (`node --test`) paired with `supertest`, alongside code styling and static analysis enforced via ESLint 9 (flat configuration).
- **Containerization**: A reproducible Docker container setup utilizing clean build contexts (`.dockerignore`) and standardized port exposure.
- **Continuous Integration (CI/CD)**: Parallel, dedicated GitHub Actions workflows for application testing, container building & registry publishing (GHCR), and Terraform configuration validation.
- **Infrastructure as Code (IaC)**: Structured Terraform configurations designed for automated syntactic validation and formatting checks without vendor lock-in.

---

## Architecture

The application is structured as a decoupled microservice within an automated delivery pipeline:

```
                          Developer Machine
                   (Local Feature / Fix / Chore)
                                 │
                                 │ git push / Pull Request
                                 ▼
                     +-----------------------+
                     |    GitHub Actions     |
                     +-----------+-----------+
                                 |
         +-----------------------+-----------------------+
         |                       |                       |
         ▼                       ▼                       ▼
  [ Node.js CI ]         [ Docker Pipeline ]    [ Terraform Check ]
  - Install dependencies - Build image          - terraform fmt -check
  - Run ESLint           - Verify build args    - terraform init
  - Run node --test      - Push to GHCR         - terraform validate
                                 │
                                 ▼
                    +--------------------------+
                    |  GitHub Packages (GHCR)  |
                    | ghcr.io/<org>/<image>    |
                    +------------+-------------+
                                 │
                                 ▼
              +-------------------------------------+
              |           Runtime Engine            |
              |       (Docker / Container Host)     |
              |                                     |
              |   Client Requests -> Port 3000      |
              |            │                        |
              |            ▼                        |
              |    Express.js Web Service           |
              |    ├── /health (Status Check)       |
              |    ├── /total  (Helper Logic)       |
              |    └── /tasks  (RESTful CRUD)       |
              +-------------------------------------+
```

---

## Repository Structure

```plaintext
.
├── .github/
│   ├── ISSUE_TEMPLATE/          # Issue templates (bug report, feature request, task)
│   ├── workflows/
│   │   ├── docker.yml           # Builds, tags, and pushes Docker images to GHCR
│   │   ├── node-ci.yml          # Lints code and runs the automated test suite
│   │   └── terraform.yml        # Validates and checks Terraform formatting
│   ├── CODEOWNERS               # Automated code review assignments
│   └── pull_request_template.md # Required PR submission checklist
├── src/
│   └── app.js                   # Application entry point, Express app, and business logic
├── test/
│   └── app.test.js              # Integration tests using Node.js native test runner & Supertest
├── terraform/
│   ├── main.tf                  # Declarative Terraform infrastructure configuration
│   └── README.md                # Infrastructure notes and instructions
├── .dockerignore                # Exclusions for the Docker build context
├── Dockerfile                   # Multi-stage / standard container definition
├── eslint.config.mjs            # Flat ESLint configuration file
├── package.json                 # Project dependencies, scripts, and runtime engines
├── package-lock.json            # Pinned dependency tree lockfile
├── CONTRIBUTING.md              # Branching guidelines and commit conventions
├── STUDENT_CHALLENGE.md         # Problem brief, requirements, and scenario guidelines
└── README.md                    # Project documentation (this file)
```

---

## Prerequisites

Before running the project locally or in containerized mode, ensure you have:

- **Node.js**: `v18.x`, `v20.x`, or `v22.x` LTS
- **npm**: `v9.x` or higher
- **Docker**: Engine `20.10+` / Docker Desktop
- **Terraform CLI**: `v1.5.0+`

---

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd platform-challenge
   ```

2. **Install exact dependencies:**
   ```bash
   npm ci
   ```

3. **Start the application in development mode:**
   ```bash
   npm start
   ```
   The service listens by default on `http://localhost:3000` (or the port defined by `PORT`).

---

## API Endpoints

| Method | Endpoint | Description | Example Payload / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Basic service metadata | None |
| `GET` | `/health` | Service health status | None |
| `GET` | `/total` | Price and quantity calculation test | None |
| `GET` | `/tasks` | List all tasks | None |
| `POST` | `/tasks` | Create a new task | `{"title": "Implement feature"}` |
| `PATCH` | `/tasks/:id` | Update completion state of an existing task | `{"completed": true}` |

---

## Running Tests & Quality Checks

The project uses the native Node.js test runner (`node --test`) along with `supertest` for HTTP integration tests, avoiding heavy testing framework overhead.

- **Run all automated tests:**
  ```bash
  npm test
  ```

- **Run code quality / linting checks:**
  ```bash
  npm run lint
  ```

- **Fix automatic linting errors:**
  ```bash
  npx eslint . --fix
  ```

---

## Docker Usage

The application includes a self-contained `Dockerfile` and a `.dockerignore` file designed to exclude unnecessary local files (such as `node_modules`, coverage, and Terraform directories).

### 1. Build the Docker Image
```bash
docker build -t devops-platform-challenge:latest .
```

### 2. Run the Container
Run the container detached, mapping container port `3000` to host port `3000`:
```bash
docker run --rm -d \
  --name platform-app \
  -p 3000:3000 \
  devops-platform-challenge:latest
```

### 3. Verify Container Health
```bash
curl http://localhost:3000/health
```

### 4. Inspect Logs & Stop
```bash
# View runtime output
docker logs -f platform-app

# Stop and remove the container
docker stop platform-app
```

---

## CI/CD Automation

Continuous Integration and Delivery workflows are located in `.github/workflows/`:

### 1. Node.js CI (`node-ci.yml`)
- **Trigger**: Every `push` and `pull_request` targeting `main`.
- **Steps**:
  - Checks out the repository.
  - Sets up the configured Node.js environment.
  - Executes `npm ci` for deterministic dependency installation.
  - Executes `npm run lint` to enforce formatting and prevent unused variables.
  - Executes `npm test` to validate endpoints and core functions.

### 2. Container Delivery (`docker.yml`)
- **Trigger**: On changes pushed or merged to `main` (and configured PR checks).
- **Steps**:
  - Authenticates securely against GitHub Container Registry (`ghcr.io`) using `GITHUB_TOKEN`.
  - Builds the container image using the root `Dockerfile`.
  - Tags the image with both commit SHA and `latest`.
  - Pushes the image to GitHub Packages / Container Registry.

### 3. Terraform Validation (`terraform.yml`)
- **Trigger**: Pushes and PRs altering files in the `terraform/**` directory.
- **Steps**:
  - Initializes the working directory with `terraform init`.
  - Verifies canonical code styling with `terraform fmt -check`.
  - Validates syntax and configuration semantics with `terraform validate`.

---

## Terraform (Infrastructure as Code)

The `terraform/` directory contains infrastructure specifications for cloud and platform environments.

> **Provider Note**: Per the challenge configuration, no live cloud credentials are used. State is local, and validation runs without remote provisioning.

### Local Verification Steps

```bash
cd terraform

# 1. Initialize configuration and download provider plugins
terraform init

# 2. Check format compliance
terraform fmt -check

# 3. Format files automatically if misaligned
terraform fmt

# 4. Validate configuration syntax
terraform validate
```

---

## Development Workflow & Quality Gates

To maintain high software reliability, all contributions follow a structured Git flow:

```text
Issue Created ──> Branch (feature/fix/chore) ──> Local Test/Lint ──> Pull Request ──> Peer Review & CI ──> Merge to main
```

1. **Pick or File an Issue**: Use one of the templates in `.github/ISSUE_TEMPLATE/` (`bug_report.yml`, `feature_request.yml`, `task.yml`).
2. **Branch Naming**:
   - `feature/<name>`: New capabilities or endpoints.
   - `fix/<name>`: Bug fixes and test repairs.
   - `chore/<name>`: Tooling, dependency, CI, or documentation changes.
3. **Commit Messages**: Follow concise imperative mood:
   - *Good*: `Add regression test for invalid status`, `Implement task completion patch endpoint`
   - *Avoid*: `fix`, `wip`, `final-final`, `stuff`
4. **Pull Request Protocol**:
   - Open PR against `main` using the provided checklist template (`.github/pull_request_template.md`).
   - Link the relevant issue number (`Fixes #<id>`).
   - At least **one technical peer review approval** is required.
   - All status checks (`node-ci`, `docker`, `terraform`) must be green before merging.

---

## Useful Commands

```bash
# Dependency & Execution
npm ci                             # Clean install pinned dependencies
npm start                          # Start the Express server
npm test                           # Run test suites via native node runner
npm run lint                       # Run ESLint validation

# Docker Operations
docker build -t app:local .        # Build local image
docker run -p 3000:3000 app:local  # Run container mapped to port 3000
docker ps                          # View active containers
docker logs -f <container_name>    # Follow live container logs

# Terraform Validation
terraform -chdir=terraform init    # Initialize Terraform working directory
terraform -chdir=terraform fmt     # Reformat configuration files
terraform -chdir=terraform validate# Validate syntax and arguments
```