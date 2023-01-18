import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  getMovieByCategoryController,
  getMovieByIdController,
} from "../../controllers/movies/movies.Controllers";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { movieCreateSerializer } from "../../serializers/movie/movie.serializer";

const moviesRouters = Router();

moviesRouters.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdm,
  dataIsValid(movieCreateSerializer),
  createMovieController
);
moviesRouters.get("", getAllMoviesController);
moviesRouters.get("/:movieId", getMovieByIdController);
moviesRouters.get("/category/:categoryId", getMovieByCategoryController);
moviesRouters.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  deleteMovieController
);

export { moviesRouters };
