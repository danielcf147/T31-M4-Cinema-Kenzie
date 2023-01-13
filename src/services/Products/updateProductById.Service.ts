import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";
import { AppError } from "../../error";
import { Product, ProductUpdate } from "../../interfaces/products/product.Interface";

export async function updateProductByIdService(id: string, update: ProductUpdate): Promise<Product> {

    const productRepository = AppDataSource.getRepository(Food)

    const product = await productRepository.findOneBy({ id: id })

    if (!product) {
        throw new AppError("Product not found", 404)
    }


    const updateProduct: Product = productRepository.create({
        ...product,
        ...update
    })

    await productRepository.save(updateProduct)

    return updateProduct


}