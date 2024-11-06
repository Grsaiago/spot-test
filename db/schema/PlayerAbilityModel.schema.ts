import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import { tableTimestamps } from "./schemaHelpers";
import { PlayerModel } from "./PlayerModel.schema";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const PlayerAbilityModel = pgTable("player_ability", {
	id: uuid().primaryKey().defaultRandom(),
	strength: integer().notNull(),
	speed: integer().notNull(),
	dribble: integer(),
	// referencia um jogador, pra fazer uma série temporal
	referencePlayer: uuid().notNull().references(() => PlayerModel.id),
	...tableTimestamps
});

export const playerAbilityRelations = relations(PlayerAbilityModel, ({ one }) => ({
	referencePlayer: one(PlayerModel, {
		fields: [PlayerAbilityModel.referencePlayer],
		references: [PlayerModel.id]
	})
}));

export type PlayerAbilitySelectModel = InferSelectModel<typeof PlayerAbilityModel>
export type PlayerAbilityInsertModel = InferInsertModel<typeof PlayerAbilityModel>
