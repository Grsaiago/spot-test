import { z } from 'zod'


export const GetPlayerByNicknameParamsSchema = z.object({
	playerNickname: z.string().max(256)
})

export type GetPlayerByNicknameUrlParams = z.infer<typeof GetPlayerByNicknameParamsSchema>;
