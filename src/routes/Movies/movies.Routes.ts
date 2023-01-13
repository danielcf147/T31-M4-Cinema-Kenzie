import { Router } from "express";
import { createMovieController, getAllMoviesController, getMovieByCategoryController, getMovieByIdController } from "../../controllers/Movies/movies.Controllers";

const moviesRouters = Router()

moviesRouters.post("", createMovieController)
moviesRouters.get("", getAllMoviesController)
moviesRouters.get("/:movieId", getMovieByIdController)
moviesRouters.get("/:categoryId", getMovieByCategoryController)

export { moviesRouters }