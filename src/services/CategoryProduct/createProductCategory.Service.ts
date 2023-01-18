import AppDataSource from "../../data-source";
import { CategoryFood } from "../../entities/categoryFoodEntity";
import { AppError } from "../../errors";
import {
  CategoryProduct,
  CategoryProductCreate,
} from "../../interfaces/category/categoryFood.interface";
export async function createProductCategoryService(
  category: CategoryProductCreate
): Promise<CategoryProduct> {
  const categoryProductsRepository = AppDataSource.getRepository(CategoryFood);

  const exist = await categoryProductsRepository.findOneBy({
    name: category.name,
  });

  if (exist) {
    throw new AppError("Category as already exist", 409);
  }

  const newCategory = categoryProductsRepository.create(category);

  await categoryProductsRepository.save(newCategory);

  return newCategory;
}
