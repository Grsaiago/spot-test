import { z } from "zod"

export const AppEnvSchema = z.object({
	dbHost: z.string(),
	dbPort: z.coerce.number().positive(),
	dbName: z.string(),
	dbUser: z.string(),
	dbPassword: z.string(),
	appPort: z.coerce.number().default(8080),
	rateLimit: z.enum(['true', 'false']).default('false'),
	rateLimitInterval: z.coerce.number().optional(),
	rateLimitCount: z.coerce.number().optional(),
})

export type AppEnv = z.infer<typeof AppEnvSchema>;
