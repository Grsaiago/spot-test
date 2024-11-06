import { z } from 'zod'


export const GetPlayerByNameParamsSchema = z.object({
	playerName: z.string().max(256)
})

export type GetPlayerByNameUrlParams = z.infer<typeof GetPlayerByNameParamsSchema>;
