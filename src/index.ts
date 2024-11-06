import { configDotenv } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres'
import { healtcheckRouter } from './routes/healtcheckRoutes';
import { playerRouter } from './routes/playerRoutes';
import express from 'express'
import { ExpressPrometheusMiddleware } from '@matteodisabatino/express-prometheus-middleware';
import rateLimit from 'express-rate-limit';
import { getAppEnvs } from './helpers';
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const oasSpecFile = require('../docs/oasSpec.json')

configDotenv()

const appEnvs = getAppEnvs()

const connection_string = `postgresql://${appEnvs.dbUser}:${appEnvs.dbPassword}@${appEnvs.dbHost}/${appEnvs.dbName}`;

export const db = drizzle({
	connection: connection_string,
	casing: 'snake_case',
});

const app = express();

// exclude metrics for the /metrics route
const promMiddleware = new ExpressPrometheusMiddleware({
	exclude: (req) => req.path == '/metrics',
	url: '/metrics'
});


/* Add global middlewares */

/* rate limiting as per: https://github.com/express-rate-limit/express-rate-limit
 * and the mozilla documentation at:
 * https://developer.mozilla.org/en-US/blog/securing-apis-express-rate-limit-and-slow-down/#understanding_express_rate_limit_middleware
*/
if (process.env.RATE_LIMIT == 'true') {
	const limiter = rateLimit({
		// How long to remember requests for, in milliseconds.
		// TODO: Change this to zod validation
		windowMs: appEnvs.rateLimitInterval,
		// How many requests to allow.
		// TODO: Change this to zod validation
		limit: appEnvs.rateLimitCount,
		// disable X-RateLimit-*
		legacyHeaders: false,
	});
	app.use(limiter);
}
app.use(promMiddleware.handler);
app.use(express.json());
//TODO: Checar se esse express.urlencoded precisa mesmo
app.use(express.urlencoded({ extended: false }));
// as per: (https://www.digitalocean.com/community/tutorials/nodejs-getting-started-morgan)
app.use(morgan("combined"));


// Add Routers here
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(oasSpecFile))
app.use('/healthcheck', healtcheckRouter);
app.use('/player', playerRouter);


// start the server
app.listen(appEnvs.appPort, "0.0.0.0", () => console.log(`Starting server on ${appEnvs.appPort}`));
