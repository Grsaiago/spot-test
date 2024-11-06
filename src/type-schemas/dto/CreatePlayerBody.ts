import { z } from 'zod'


// Some sanitizing on the input to trim whitespaces and bring sanity
// to the ammount of whitespaces inside the name
export const CreatePlayerBodySchema = z.object({
	name: z.string().max(256, "'name'too big, max len is 256")
		.trim().transform((str) => str.replace(/\s+/, ' ')),
	nickname: z.string().max(256, "'nickname' too big, max len is 256")
		.trim().transform((str) => str.replace(/\s+/, ' ')).optional(),
	strength: z.coerce.number().gte(0).lte(10),
	speed: z.coerce.number().gte(0).lte(10),
	dribble: z.coerce.number().gte(0).lte(10).optional(),
})

export type CreatePlayerBody = z.infer<typeof CreatePlayerBodySchema>;
