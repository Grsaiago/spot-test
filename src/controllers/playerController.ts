import { Request, Response } from "express"
import { CreatePlayerBody } from "../type-schemas/dto/CreatePlayerBody"
import { PlayerWithAbilitiy } from "../type-schemas/dto/PlayerWithAbility";
import { GetPlayerByNameUrlParams } from "../type-schemas/dto/GetPLayerByNameUrlParams";
import { GetPlayerByNicknameUrlParams } from "../type-schemas/dto/GetPayerByNicknameUrlParams";
import { PaginationParams } from "../type-schemas/dto/PaginationParams";
import { PlayerId } from "../type-schemas/dto/GetPlayerByIdUrlParams";

import { db } from "../index";
import { PlayerAbilityInsertModel, PlayerAbilityModel, PlayerAbilitySelectModel } from "../../db/schema/PlayerAbilityModel.schema";
import { PlayerInsertModel, PlayerModel, PlayerSelectModel } from "../../db/schema/PlayerModel.schema";
import { eq, and, isNull, ilike, isNotNull, DrizzleError } from "drizzle-orm";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { DatabaseError } from "pg";


// parse, don't validate
export class PlayerController {
	static async createPlayer(req: Request<{}, {}, CreatePlayerBody>, res: Response<{
		createdPlayer: PlayerInsertModel,
		createdAbility: PlayerAbilityInsertModel
	} | { message: ReasonPhrases }>) {
		// create new player
		const newPlayer: PlayerInsertModel = {
			name: req.body.name,
			nickname: req.body.nickname,
		}
		try {
			// The only table with a unique relevant constraint is
			// the PlayerModel. If it wasn't the case, I would've used
			// a transaction in here.
			const createdPlayer = await db.insert(PlayerModel).values(newPlayer).returning()
			const newAbility: PlayerAbilityInsertModel = {
				speed: req.body.speed,
				strength: req.body.strength,
				dribble: req.body.dribble,
				referencePlayer: createdPlayer[0].id
			}
			// create new ability referencing said player
			const createdAbility = await db.insert(PlayerAbilityModel).values(newAbility).returning();

			res.json({
				createdPlayer: { ...createdPlayer[0] },
				createdAbility: { ...createdAbility[0] }
			});
		}
		catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.BAD_REQUEST)
					.json({
						message: ReasonPhrases.BAD_REQUEST
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}

	}

	static async getPlayers(req: Request<{}, {}, {}, PaginationParams>,
		res: Response<Partial<PlayerSelectModel>[] | { message: ReasonPhrases }>) {
		try {
			const players: Partial<PlayerSelectModel>[] = await db.select(
				{
					id: PlayerModel.id,
					name: PlayerModel.name,
					nickname: PlayerModel.nickname,
					createdAt: PlayerModel.createdAt,
				}
			).from(PlayerModel).where(
				isNull(PlayerModel.deletedAt)
			).offset(req.query.offset).limit(req.query.limit);

			res.json(players);
		}
		catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.BAD_REQUEST)
					.json({
						message: ReasonPhrases.BAD_REQUEST
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}
	}

	static async getPlayerById(req: Request<PlayerId, {}, {}, PaginationParams>,
		res: Response<PlayerWithAbilitiy | { message: ReasonPhrases }>) {
		try {
			// I'd rather have monads than this try catch.
			// Oh well, it's JS afterall
			const playerQuery: PlayerSelectModel[] = await db.select().from(PlayerModel).where(and(
				eq(PlayerModel.id, req.params.playerId),
				isNull(PlayerModel.deletedAt)
			)).limit(1);
			const habilitiesQuery: PlayerAbilitySelectModel[] = await db.select().from(PlayerAbilityModel).where(and(
				eq(PlayerAbilityModel.referencePlayer, req.params.playerId),
				isNull(PlayerAbilityModel.deletedAt)
			)).orderBy(PlayerAbilityModel.createdAt).limit(1)

			const foundPlayer: PlayerWithAbilitiy = {
				id: playerQuery[0].id,
				name: playerQuery[0].name,
				nickname: playerQuery[0].nickname,
				strength: habilitiesQuery[0].strength,
				speed: habilitiesQuery[0].speed,
				dribble: habilitiesQuery[0].speed,
				createdAt: playerQuery[0].createdAt,
				updatedAt: playerQuery[0].updatedAt,
				lastAbilityUpdate: habilitiesQuery[0].createdAt
			};
			res.json(foundPlayer);
		}
		catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.NOT_FOUND)
					.json({
						message: ReasonPhrases.NOT_FOUND
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}
	}

	static async getPlayerByName(req: Request<GetPlayerByNameUrlParams, {}, {}, PaginationParams>,
		res: Response<Partial<PlayerSelectModel>[] | { message: ReasonPhrases }>) {
		try {
			const players: Partial<PlayerSelectModel>[] = await db.select(
				{
					id: PlayerModel.id,
					name: PlayerModel.name,
					nickname: PlayerModel.nickname,
					createdAt: PlayerModel.createdAt,
				}
			).from(PlayerModel).where(and(
				ilike(PlayerModel.name, `%${req.params.playerName}%`),
				isNull(PlayerModel.deletedAt)
			)).limit(req.query.limit).offset(req.query.offset);

			res.json(players);
		}
		catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.NOT_FOUND)
					.json({
						message: ReasonPhrases.NOT_FOUND
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}
	}

	static async getPlayerByNickname(req: Request<GetPlayerByNicknameUrlParams, {}, {}, PaginationParams>,
		res: Response<Partial<PlayerSelectModel>[] | { message: ReasonPhrases }>) {
		try {
			const players: Partial<PlayerSelectModel>[] = await db.select(
				{
					id: PlayerModel.id,
					name: PlayerModel.name,
					nickname: PlayerModel.nickname,
					createdAt: PlayerModel.createdAt,
				}
			).from(PlayerModel).where(and(
				ilike(PlayerModel.nickname, `%${req.params.playerNickname}%`),
				isNull(PlayerModel.deletedAt)
			)).limit(req.query.limit).offset(req.query.offset);

			res.json(players);
		}
		catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.NOT_FOUND)
					.json({
						message: ReasonPhrases.NOT_FOUND
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}
	}

	static async getPlayerAbilityHistory(req: Request<PlayerId>, res: Response<Partial<PlayerAbilitySelectModel>[] | { message: ReasonPhrases }>) {
		try {
			const stats: Partial<PlayerAbilitySelectModel>[] = await db.select({
				strength: PlayerAbilityModel.strength,
				speed: PlayerAbilityModel.speed,
				dribble: PlayerAbilityModel.dribble,
				createdAt: PlayerAbilityModel.createdAt
			}).from(PlayerAbilityModel).where(and(
				eq(PlayerModel.id, req.params.playerId),
				isNotNull(PlayerAbilityModel.deletedAt)
			))
			res.json(stats);
		} catch (err) {
			if (err instanceof DrizzleError || err instanceof DatabaseError) {
				res.status(StatusCodes.NOT_FOUND)
					.json({
						message: ReasonPhrases.NOT_FOUND
					});
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({
						message: ReasonPhrases.INTERNAL_SERVER_ERROR
					});
			}
		}
	}
}
