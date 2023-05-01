import { Request, Response } from "express";
import { TMoviesPagination, TMoviesRequest } from "../interfaces/movies.interfaces";
import createMoviesService from "../services/createMovies.service";
import listUserService from "../services/listMovies.service";
import updateMoviesService from "../services/updateMovies.service";
import deleteMoviesService from "../services/deleteMovies.service";

const createMoviesController = async (request: Request, response: Response): Promise<Response> => {
    const movieData: TMoviesRequest = request.body;
    const newMovie = await createMoviesService(movieData);
    return response.status(201).json(newMovie);
};

const listMoviesController = async (request: Request, response: Response): Promise<Response> => {
    const { page, perPage, order, sort }: any = request.query;
    const movies: TMoviesPagination = await listUserService(page, perPage, order, sort);
    return response.json(movies);
};

const updateMoviesController = async (request: Request, response: Response): Promise<Response> => {
    const movieData: TMoviesRequest = request.body;
    const movieId: number = Number(request.params.id);
    const newMovieData = await updateMoviesService(movieData, movieId);
    return response.json(newMovieData);
};

const deleteMoviesController = async (request: Request, response: Response): Promise<Response> => {
    const movieId: number = Number(request.params.id);
    const movies = await deleteMoviesService(movieId);
    return response.status(204).send();
};

export { createMoviesController, listMoviesController, updateMoviesController, deleteMoviesController };
