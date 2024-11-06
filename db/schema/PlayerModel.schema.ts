import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { tableTimestamps } from "./schemaHelpers";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { PlayerAbilityModel } from "./PlayerAbilityModel.schema";

export const PlayerModel = pgTable("player", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 256 }).notNull().unique(),
	nickname: varchar({ length: 256 }),
	// stats: A player Hability mais recente não está aqui porque teriamos
	// dois caminhos para o mesmo dado, ferindo assim a FN TODO:
	...tableTimestamps,
})

export const playerRelations = relations(PlayerModel, ({ many }) => ({
	playerAbilityHistory: many(PlayerAbilityModel)
}))

export type PlayerSelectModel = InferSelectModel<typeof PlayerModel>
export type PlayerInsertModel = InferInsertModel<typeof PlayerModel>
