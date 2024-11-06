import { AppEnv, AppEnvSchema } from './type-schemas//general/AppEnv';

export function getAppEnvs(): AppEnv {
	return AppEnvSchema.parse({
		dbHost: process.env.DB_HOST,
		dbPort: process.env.DB_PORT,
		dbName: process.env.POSTGRES_DB,
		dbUser: process.env.POSTGRES_USER,
		dbPassword: process.env.POSTGRES_PASSWORD,
		appPort: process.env.APP_PORT,
		rateLimit: process.env?.RATE_LIMIT,
		rateLimitInterval: process.env?.RATE_LIMIT_INTERVAL,
		rateLimitCount: process.env?.RATE_LIMIT_LIMIT_COUNT,
	})
}
