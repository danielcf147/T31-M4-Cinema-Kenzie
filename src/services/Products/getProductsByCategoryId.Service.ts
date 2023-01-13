import AppDataSource from "../../data-source";
import { CategoryFood } from "../../entities/categoryFoodEntity";
import { Food } from "../../entities/foodEntity";
import { Product } from "../../interfaces/products/product.Interface";

export async function getProductsByCategoryIdService(categoryId: string): Promise<Product[]> {
    const productsRepository = AppDataSource.getRepository(Food)
    const categoryRepository = AppDataSource.getRepository(CategoryFood)
    const productQueryBuilder = productsRepository.createQueryBuilder("product")

    const products = productQueryBuilder.where("product.categoryFoodId = :id", {
        id: categoryId
    })

    return products.getMany()

    return
}