import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";
import { AppError } from "../../errors";

export async function getProductByIdService(id: string) {
  const productsRepository = AppDataSource.getRepository(Food);
  const productsQueryBuilder = productsRepository.createQueryBuilder("product");

  const product = await productsQueryBuilder
    .leftJoinAndSelect("product.categoryFood", "categoryFood")
    .where("product.id = :id", { id: id })
    .getOne();

  const data = {
    id: product.id,
    name: product.name,
    stock: product.stock,
    price: product.price,
    category: product.categoryFood.name,
  };

  return data;
}
