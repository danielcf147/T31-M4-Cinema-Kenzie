import AppDataSource from "../../data-source";
import { CategoryFood } from "../../entities/categoryFoodEntity";
import { AppError } from "../../error";
import { CategoryProduct } from "../../interfaces/category/categoryFood.interface";

export async function getProductCategoryById(id: string): Promise<CategoryProduct> {
    const productCategoryRepository = AppDataSource.getRepository(CategoryFood)

    const category = await productCategoryRepository.findOneBy({ id: id });

    if (!category) {
        throw new AppError("This product category does not exist", 404)
    }

    return category;
}