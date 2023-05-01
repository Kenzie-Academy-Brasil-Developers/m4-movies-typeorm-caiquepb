import { Router } from "express";
import { createMoviesController, deleteMoviesController, listMoviesController, updateMoviesController } from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { movieSchemaRequest, movieUpdateSchema } from "../schemas/movies.schemas";
import ensureIdIsValidMiddleware from "../middlewares/ensureIdIsValid.middleware";
import ensureNameIsValidMiddleware from "../middlewares/ensureNameIsValid.middleware";

const moviesRoutes: Router = Router();
moviesRoutes.post("", ensureNameIsValidMiddleware, ensureDataIsValidMiddleware(movieSchemaRequest), createMoviesController);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch("/:id", ensureIdIsValidMiddleware, ensureNameIsValidMiddleware, ensureDataIsValidMiddleware(movieUpdateSchema), updateMoviesController);
moviesRoutes.delete("/:id", ensureIdIsValidMiddleware, deleteMoviesController);

export default moviesRoutes;
