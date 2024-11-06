# Project Name

A Node.js + Express API, built with a strong focus on
strict typing, data validation, security, and observability.

## Project Overview

This API is written in TypeScript with a strict configuration and designed to
provide reliable services with enhanced observability and security measures.
The system can generate a graph of player ability stats history for frontend use
and includes API documentation with Swagger.

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

- Player Ability Stats History: A feature enables the frontend to plot a graph of
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

3. Set up the environment variables as specified in .env.example.

4. Run docker-compose up to start all services, including Prometheus and Grafana.
