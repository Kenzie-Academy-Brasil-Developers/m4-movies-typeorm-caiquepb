import { Repository } from "typeorm";
import { TMovieUpdateRequest, TMovies } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";

const updateMoviesService = async (movieData: TMovieUpdateRequest, movieId: number): Promise<TMovies> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const oldMovieData: Movie | null = await movieRepository.findOneBy({
        id: movieId,
    });
    const newMovieData: Movie = movieRepository.create({
        ...oldMovieData,
        ...movieData,
    });
    await movieRepository.save(newMovieData);
    const returnMovie: TMovies = movieSchema.parse(newMovieData);
    return returnMovie;
};

export default updateMoviesService;
