import express from 'express'
import { PlayerController } from '../controllers/playerController';
import { PlayerIdSchema } from '../type-schemas/dto/GetPlayerByIdUrlParams';
import { CreatePlayerBodySchema } from '../type-schemas/dto/CreatePlayerBody';
import { RequestValidationMiddlewareBuilder, RequestPart } from './middlewares/validator-middlewares';
import { GetPlayerByNameParamsSchema } from '../type-schemas/dto/GetPLayerByNameUrlParams';
import { GetPlayerByNicknameParamsSchema } from '../type-schemas/dto/GetPayerByNicknameUrlParams';
import { PaginationParamsSchema } from '../type-schemas/dto/PaginationParams';

const playerRouter = express.Router();

playerRouter.post('/',
	RequestValidationMiddlewareBuilder(CreatePlayerBodySchema, RequestPart.BODY), PlayerController.createPlayer
)

playerRouter.get('/',
	RequestValidationMiddlewareBuilder(PaginationParamsSchema, RequestPart.QUERYPARAMS), PlayerController.getPlayers
)

playerRouter.get('/id/:playerId',
	RequestValidationMiddlewareBuilder(PlayerIdSchema, RequestPart.URLPARAMS), PlayerController.getPlayerById
)

playerRouter.get('/name/:playerName',
	RequestValidationMiddlewareBuilder(GetPlayerByNameParamsSchema, RequestPart.URLPARAMS), PlayerController.getPlayerByName
)

playerRouter.get('/nickname/:playerNickname',
	RequestValidationMiddlewareBuilder(GetPlayerByNicknameParamsSchema, RequestPart.URLPARAMS), PlayerController.getPlayerByNickname
)

playerRouter.get('/abilities/history/:playerId',
	RequestValidationMiddlewareBuilder(PlayerIdSchema, RequestPart.URLPARAMS), PlayerController.getPlayerAbilityHistory
)

export { playerRouter } 
