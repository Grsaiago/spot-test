import { z } from 'zod'


export const PlayerIdSchema = z.object({
	playerId: z.string().uuid()
})

export type PlayerId = z.infer<typeof PlayerIdSchema>;
