# DevOps Platform Challenge

This project is a Node.js application developed as part of the DevOps Platform Challenge.

The objective is to implement a collaborative DevOps workflow using GitHub, GitHub Actions, Docker and Terraform.

## Technologies

Node.js  
Express  
Git and GitHub  
GitHub Actions  
Docker  
Terraform  

## Project Structure

The application source code is located in the src folder.

The automated tests are located in the test folder.

The Terraform configuration is located in the terraform folder.

GitHub Actions workflows are located in .github/workflows.

The project also contains a Dockerfile used to build the application container.

## Installation

Clone the GitHub repository.

Repository: github.com/naderbenmimoun/platform-challenge

Open the project folder and install the Node.js dependencies with:

npm install

## Run the Application

Start the application with:

npm start

The application listens on port 3000.

## Tests

Run the automated tests with:

npm test

The tests verify the application logic and the Tasks API endpoints.

## Tasks API

GET /tasks

Returns the list of tasks with HTTP status 200.

Each task contains an id, a title and a completed status.

DELETE /tasks/:id

Deletes an existing task.

If the task exists, the API returns HTTP status 204.

If the task does not exist, the API returns HTTP status 404.

## Docker

Docker is used to package the Node.js application into a container.

Build the Docker image with:

docker build -t platform-challenge .

Run the container with:

docker run -p 3000:3000 platform-challenge

A GitHub Actions workflow is used to automate the Docker build and publishing process.

## Terraform

The Terraform configuration is located in terraform/main.tf.

No cloud provider is required for this project.

The Terraform configuration can be checked with the following commands:

terraform fmt -check terraform

terraform -chdir=terraform init

terraform -chdir=terraform validate

The Terraform GitHub Actions workflow automatically performs formatting, initialization and validation.

## GitHub Workflow

Development is performed using dedicated branches such as feature, fix and chore branches.

The main branch is protected.

The development workflow is:

Issue -> Branch -> Code and Tests -> Pull Request -> Review -> Approval -> CI Checks -> Merge into main

Each change starts with a GitHub Issue.

The development is performed on a dedicated branch.

A Pull Request is created when the work is ready.

Another team member reviews and approves the Pull Request before it is merged into main.

## Project Architecture

The project is organized as follows:

.github/  
Contains GitHub configuration, Issue templates, Pull Request template and GitHub Actions workflows.

.github/workflows/  
Contains the CI/CD workflows for Docker and Terraform.

src/  
Contains the Node.js application source code.

src/app.js  
Contains the Express application and the API endpoints.

test/  
Contains the automated tests.

test/app.test.js  
Contains the tests for the application and Tasks API.

terraform/  
Contains the Terraform infrastructure configuration.

terraform/main.tf  
Contains the Terraform configuration validated by the CI workflow.

Dockerfile  
Defines how the application Docker image is built.

.dockerignore  
Defines the files that are excluded from the Docker image.

package.json  
Contains the Node.js dependencies and project scripts.

README.md  
Contains the project documentation.

## Continuous Integration

GitHub Actions is used to automate project validation.

The project includes workflows for Node.js tests, Docker and Terraform.

These checks help ensure that changes are tested and validated before they are merged into the main branch.

## Collaboration

The team uses GitHub Issues, branches, Pull Requests, code reviews and GitHub Actions to collaborate on the project.