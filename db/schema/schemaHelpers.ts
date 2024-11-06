import { timestamp } from "drizzle-orm/pg-core";

const tableTimestamps = {
	updatedAt: timestamp().notNull().defaultNow(), // como fazer pra atualizar sempre que mexe na linha
	createdAt: timestamp().notNull().defaultNow(),
	deletedAt: timestamp()
};

export { tableTimestamps };
