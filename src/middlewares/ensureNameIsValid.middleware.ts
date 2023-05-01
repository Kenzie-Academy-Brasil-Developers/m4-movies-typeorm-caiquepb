import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureNameIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movie = request.body.name;
    if (movie) {
        const movieData: Movie | null = await moviesRepository.findOne({
            where: {
                name: movie,
            },
        });
        if (movieData) {
            throw new AppError("Movie already exists.", 409);
        }
    }
    return next();
};

export default ensureNameIsValidMiddleware;
