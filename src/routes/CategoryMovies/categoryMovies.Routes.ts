import { Router } from "express";
import {
  createCategoryMovieController,
  getMovieCategoriesController,
  getMovieCategoryByIdController,
} from "../../controllers/CategoryMovie/categoryMovie.Controller";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { categoryMovieCreateSerializer } from "../../serializers/categoryMovie/categoryMovie.serializer";

const categoryMovieRouters = Router();

categoryMovieRouters.post(
  "",
  dataIsValid(categoryMovieCreateSerializer),
  ensureAuthMiddleware,
  ensureIsAdm,
  createCategoryMovieController
);
categoryMovieRouters.get("", getMovieCategoriesController);
categoryMovieRouters.get("/:id", getMovieCategoryByIdController);

export { categoryMovieRouters };
