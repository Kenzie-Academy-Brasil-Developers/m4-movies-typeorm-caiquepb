import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movieData: Movie | null = await moviesRepository.findOneBy({
        id: Number(request.params.id),
    });
    if (!movieData) {
        throw new AppError("Movie not found", 404);
    }
    return next();
};

export default ensureIdIsValidMiddleware;
