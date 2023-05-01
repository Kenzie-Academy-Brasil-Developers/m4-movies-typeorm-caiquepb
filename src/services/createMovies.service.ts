import { Repository } from "typeorm";
import Movie from "../entities/movies.entity";
import { TMoviesRequest } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";

const createMoviesService = async (movieData: TMoviesRequest): Promise<Movie> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movie: Movie = movieRepository.create(movieData);
    await movieRepository.save(movie);
    const returnMovies = movieSchema.parse(movie)
    return returnMovies
};

export default createMoviesService;
