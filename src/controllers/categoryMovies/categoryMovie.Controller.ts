import {
  CategoryMovie,
  CategoryMovieCreate,
} from "../../interfaces/category/categoryMovie.Interface";
import { Request, Response } from "express";
import { createCategoryMovieService } from "../../services/categoryMovie/createCategoryMovie.Service";
import { getMovieCategoriesService } from "../../services/categoryMovie/getMovieCategories.Service";
import { getMovieCategoryByIdService } from "../../services/categoryMovie/getMovieCategoryById.Service";

export async function createCategoryMovieController(
  req: Request,
  res: Response
) {
  const category: CategoryMovieCreate = req.body;

  const newCategory: CategoryMovie = await createCategoryMovieService(category);

  return res.status(201).json(newCategory);
}

export async function getMovieCategoriesController(
  req: Request,
  res: Response
) {
  const categories: CategoryMovie[] = await getMovieCategoriesService();

  return res.status(200).json(categories);
}

export async function getMovieCategoryByIdController(
  req: Request,
  res: Response
) {
  const categoryId = req.params.id;

  const category = await getMovieCategoryByIdService(categoryId);

  return res.status(200).json(category);
}
