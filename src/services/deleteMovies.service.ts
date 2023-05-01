import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";


const deleteMoviesService = async (movieId: number) => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movie: Movie | null = await movieRepository.findOneBy({
        id: movieId,
    });
    await movieRepository.remove(movie!);
};

export default deleteMoviesService;
