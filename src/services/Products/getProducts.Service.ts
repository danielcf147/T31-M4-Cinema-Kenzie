import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";
import { ProductReturn } from "../../interfaces/products/product.Interface";

export async function getProductsService() {

    const productsRepository = AppDataSource.getRepository(Food)

    const products = productsRepository.find({
        relations: {
            categoryFood: true
        }
    })

    return products;
}