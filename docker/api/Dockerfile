FROM node:latest

# taken from (https://pnpm.io/installation)
# install pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# install ts-node
RUN ["pnpm", "i", "-g", "ts-node"]

WORKDIR /app
COPY ./db/ ./db/
COPY ./docs ./docs/
COPY ./src ./src/
COPY ./package.json .
COPY ./drizzle.config.ts .
COPY ./pnpm-lock.yaml .
COPY ./tsconfig.json .

RUN ["pnpm", "i"]

ENTRYPOINT pnpm db-migrations-gen && pnpm db-migrations-apply && ts-node src/index.ts
