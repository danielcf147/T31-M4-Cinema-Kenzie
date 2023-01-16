import { Router } from "express";
import {
  createMovieController,
  getAllMoviesController,
  getMovieByCategoryController,
  getMovieByIdController,
} from "../../controllers/Movies/movies.Controllers";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import { movieCreateSerializer } from "../../serializers/movies/movie.serializer";

const moviesRouters = Router();

moviesRouters.post(
  "",
  dataIsValid(movieCreateSerializer),
  createMovieController
);
moviesRouters.get("", getAllMoviesController);
moviesRouters.get("/:movieId", getMovieByIdController);
moviesRouters.get("/:categoryId", getMovieByCategoryController);

export { moviesRouters };
