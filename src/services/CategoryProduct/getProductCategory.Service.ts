import { CategoryProduct } from './../../interfaces/category/categoryFood.interface';
import AppDataSource from "../../data-source";
import { CategoryFood } from "../../entities/categoryFoodEntity";

export async function getProductCategoryService(): Promise<CategoryProduct[]> {
    const categoryProductsRepository = AppDataSource.getRepository(CategoryFood)

    const categories = await categoryProductsRepository.find()

    return categories;
}