import { z } from 'zod'


export const PaginationParamsSchema = z.object({
	limit: z.coerce.number().default(10),
	offset: z.coerce.number().default(0),
})

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
