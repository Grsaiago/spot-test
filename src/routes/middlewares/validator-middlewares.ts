import { z, ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export enum RequestPart {
	BODY,
	URLPARAMS,
	QUERYPARAMS,
};

export function RequestValidationMiddlewareBuilder(schema: ZodSchema, option: RequestPart) {
	switch (option) {
		case RequestPart.BODY:
			return (req: Request<z.infer<typeof schema>, any, any, any>, res: Response, next: NextFunction) => {
				try {
					req.body = schema.parse(req.body);
					next();
				} catch (err) {
					if (err instanceof ZodError) {
						res.status(StatusCodes.BAD_REQUEST).json({ error: err.issues });
					}
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
				}
			}
		case RequestPart.URLPARAMS:
			return (req: Request<z.infer<typeof schema>, any, any, any>, res: Response, next: NextFunction) => {
				try {
					req.params = schema.parse(req.params);
					next();
				} catch (err) {
					if (err instanceof ZodError) {
						res.status(StatusCodes.BAD_REQUEST).json({ error: err.issues });
					}
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
				}
			}
		case RequestPart.QUERYPARAMS:
			return (req: Request<any, any, any, z.infer<typeof schema>>, res: Response, next: NextFunction) => {
				try {
					req.query = schema.parse(req.query);
					next();
				} catch (err) {
					if (err instanceof ZodError) {
						res.status(StatusCodes.BAD_REQUEST).json({ error: err.issues });
					}
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
				}
			}
	}
};
