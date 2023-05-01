import { z } from "zod";
import { movieSchema, movieSchemaRequest, movieSchemaResponse } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

type TMovies = z.infer<typeof movieSchema>;
type TMoviesRequest = z.infer<typeof movieSchemaRequest>;
type TMoviesResponse = z.infer<typeof movieSchemaResponse>;
type TMovieUpdateRequest = DeepPartial<TMoviesRequest>;

type TMoviesPagination = {
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data: TMoviesResponse;
};

export { TMovies, TMoviesRequest, TMoviesResponse, TMovieUpdateRequest, TMoviesPagination };
