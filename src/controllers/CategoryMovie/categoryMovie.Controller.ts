import { CategoryMovie, CategoryMovieCreate } from './../../interfaces/category/categoryMovie.Interface';
import { Request, Response } from "express";
import { createCategoryMovieService } from '../../services/CategoryMovie/createCategoryMovie.Service';
import { getMovieCategoriesService } from '../../services/CategoryMovie/getMovieCategories.Service';

export async function createCategoryMovieController(req: Request, res: Response) {
    const category: CategoryMovieCreate = req.body

    const newCategory: CategoryMovie = await createCategoryMovieService(category)

    return res.status(201).json(newCategory)
}

export async function getMovieCategoriesController(req: Request, res: Response) {
    const categories: CategoryMovie[] = await getMovieCategoriesService()

    return res.status(200).json(categories)
}