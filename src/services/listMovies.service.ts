import { Repository } from "typeorm";
import { TMoviesPagination } from "../interfaces/movies.interfaces";
import Movie from "../entities/movies.entity";
import { AppDataSource } from "../data-source";

const listUserService = async (page: number, perPage: number, order: any, sort: any): Promise<TMoviesPagination> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
    const count: number = await moviesRepository.count();
    let skip: number = Number(page) || 1;
    let take: number = Number(perPage) || 5;
    if (skip <= 0) {skip = 1}
    if (take > 5 || take <= 0) {take = 5}
    if(!sort || order !== 'desc'){order = 'asc'}
    if(!sort && sort !== 'price' && sort !== 'duration'){sort = 'id'}
    const prevPage = skip > 1 ? `http://localhost:3000/movies?page=${skip - 1}&perPage=${take}` : null;
    const nextPage = skip < count / take ? `http://localhost:3000/movies?page=${skip + 1}&perPage=${take}` : null;
    const data: Movie[] | undefined = await moviesRepository.find({
        skip: (skip - 1) * take,
        take: take,
        order: {
            [sort]: order,
        },
    });
    return {
        prevPage,
        nextPage,
        count,
        data,
    };
};

export default listUserService;
