import { configDotenv } from "dotenv"
import { defineConfig } from "drizzle-kit"
import { z } from "zod";


configDotenv()

const dbEnvs = z.object({
	dbHost: z.string(),
	dbPort: z.coerce.number().gte(1),
	dbName: z.string(),
	dbUser: z.string(),
	dbPassword: z.string(),
}).parse({
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbName: process.env.POSTGRES_DB,
	dbUser: process.env.POSTGRES_USER,
	dbPassword: process.env.POSTGRES_PASSWORD,
})

export default defineConfig({
	dialect: "postgresql",
	schema: "./db/schema",
	out: "./db/migrations",
	// to make the db table names as snake_case and use it in the
	// ts code as camelCase:
	// (https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing)
	casing: "snake_case",
	dbCredentials: {
		host: dbEnvs.dbHost,
		port: dbEnvs.dbPort,
		user: dbEnvs.dbUser,
		password: dbEnvs.dbPassword,
		database: dbEnvs.dbName,
		ssl: false,
	},
})
