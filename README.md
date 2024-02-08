# FASOL Docker Application
## Introduction
This repository contains Docker Compose files for deploying the Fasol application along with Mysql and Web services. The setup is containerized using Docker to simplify the deployment process.

## Prerequisites
Before deploying the Application, ensure that the following tools are installed:
## Table of Contents
- DOCKEr: Containerization platform used for building and running containers.
- Docker Compose: Tool for defining and running multi-container Docker applications.
## Deployment
1. Build Docker Images:
```
docker-compose build
```
2. Run Docker Containers:
```
docker-compose up -d
```


3. Access the Fasol Application:

Once the containers are running, access the Fasol application at `http://localhost:4000`.

4. Configuration
- `Environment Variables`: Environment variables are configured in the docker-compose.yml file under the Fasol service.
- `MongoDB Environment Variables`: Environment variables for Mysql are configured in the docker-compose.yml file under the mongodb service.