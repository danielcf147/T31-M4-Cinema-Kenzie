import { AppError } from './../../error/index';
import { Product, ProductCreate } from './../../interfaces/products/product.Interface';
import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";

export async function createProductsService(data: ProductCreate) {
    const productsRepository = AppDataSource.getRepository(Food)

    const exist = await productsRepository.findOneBy({ name: data.name });

    if (exist) {
        throw new AppError('This product is already in the list of products', 409)
    }

    const newProduct = productsRepository.create(data)

    await productsRepository.save(newProduct)

    return newProduct

}