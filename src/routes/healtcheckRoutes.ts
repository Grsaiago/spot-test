import express from 'express'
import { Request, Response } from 'express';

const healtcheckRouter = express.Router();

healtcheckRouter.get("/", (req: Request, res: Response) => {
	void req;
	console.info("OK");
	res.json({ status: "OK" });
})

export { healtcheckRouter } 
