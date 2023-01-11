import { Router } from "express";
import { createMovieController } from "../../controllers/Movies/movies.Controllers";

const moviesRouters = Router()

moviesRouters.post("", createMovieController)

export { moviesRouters }