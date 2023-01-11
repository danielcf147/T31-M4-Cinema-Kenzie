import { Router } from "express";
import { createCategoryMovieController, getMovieCategoriesController } from "../../controllers/CategoryMovie/categoryMovie.Controller";

const categoryMovieRouters = Router()

categoryMovieRouters.post('', createCategoryMovieController)
categoryMovieRouters.get('', getMovieCategoriesController)

export { categoryMovieRouters }