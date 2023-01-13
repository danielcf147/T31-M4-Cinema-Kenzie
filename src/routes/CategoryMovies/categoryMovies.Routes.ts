import { Router } from "express";
import { createCategoryMovieController, getMovieCategoriesController, getMovieCategoryByIdController } from "../../controllers/CategoryMovie/categoryMovie.Controller";

const categoryMovieRouters = Router()

categoryMovieRouters.post('', createCategoryMovieController)
categoryMovieRouters.get('', getMovieCategoriesController)
categoryMovieRouters.get('/:id', getMovieCategoryByIdController)

export { categoryMovieRouters }