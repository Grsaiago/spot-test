# SPOT Metrics Technical Assignment

A Node.js + Express API, built with a strong focus on
strict typing, data validation, security, and observability.

## Project Overview

This API is written in TypeScript with all strict typing turned on and documentation via Swagger-ui following OAS 3.0 specs.
The API is designed to provide reliable services with enhanced observability with Prometheus and Grafana,
and a layer of security with internal isolation of services and a Rate Limiting functionality on the API.

## Features

### Code Structure

- TypeScript Strict Mode: Enforced with "noImplicitAny" set to true,
ensuring explicit typing across the codebase for improved readability and error prevention.

- Data Validation with Zod: Every incoming request from outside the API is validated
using Zod schemas, guaranteeing data integrity and type safety.

- Environment Validation with Zod: Environment variables are validated at startup,
ensuring all required configurations are set correctly.

- Middleware Builder Pattern: A reusable middleware builder function
that leverages Zod schemas to dynamically create middleware for different parts of the request,
based on configuration.

### API Features

- Healthcheck Route: Provides a quick status check endpoint.

- Configurable Rate Limiting: Rate limiting is controlled through environment variables,
allowing for easy adjustments based on load requirements.

- API Documentation: Integrated Swagger documentation provides an interactive and
comprehensive reference for the API’s endpoints.

- Player Ability Stats History: This endpoint enables a future implementation of a graph of
player ability stats history, offering a visual overview of stats changes over time.

### Architecture

- Docker Compose: The project is containerized using Docker Compose,
providing an isolated environment that simplifies deployment and testing.

- Zero Trust Policy: Each container is isolated and only allowed access
to necessary services, enhancing security.

- Observability with Prometheus and Grafana: Out-of-the-box monitoring setup
using Prometheus and Grafana, activated automatically at startup with
docker-compose up.

### Setup

1. Clone the repository.

2. Ensure you have Docker installed.

3. Create a .env file following the  env.example (or just rename env.example as .env)

4. Run docker-compose up to start all services.

5. Go to /api-docs to check out documentation.

6. ping localhost:3000 to check out a Grafana dashboard already setup at startup.
