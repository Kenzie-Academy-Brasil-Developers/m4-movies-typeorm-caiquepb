import { z } from "zod";

const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().positive(),
    price: z.number().positive().int(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const movieSchemaResponse = z.array(movieSchema);

const movieUpdateSchema = movieSchema.partial();

export { movieSchema, movieSchemaRequest, movieSchemaResponse, movieUpdateSchema };
