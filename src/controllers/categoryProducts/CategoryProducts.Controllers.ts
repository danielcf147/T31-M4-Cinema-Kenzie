import { Request, Response } from "express";
import { CategoryProductCreate } from "../../interfaces/category/categoryFood.interface";
import { createProductCategoryService } from "../../services/categoryProduct/createProductCategory.Service";
import { getProductCategoryService } from "../../services/categoryProduct/getProductCategory.Service";
import { getProductCategoryById } from "../../services/categoryProduct/getProductCategoryById.Service";

export async function createProductCategoryController(
  req: Request,
  res: Response
) {
  const category = req.body;

  const newCategory = await createProductCategoryService(category);

  return res.status(201).json(newCategory);
}

export async function getProductCategoryController(
  req: Request,
  res: Response
) {
  const categories: CategoryProductCreate[] = await getProductCategoryService();

  return res.status(200).json(categories);
}

export async function getProductCategoryByIdController(
  req: Request,
  res: Response
) {
  const id = req.params.id;

  const category = await getProductCategoryById(id);

  return res.status(200).json(category);
}
