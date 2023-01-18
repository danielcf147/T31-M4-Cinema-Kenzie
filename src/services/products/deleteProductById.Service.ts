import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";
import { AppError } from "../../errors";

export async function deleteProductByIdService(id: string) {
  const productRepository = AppDataSource.getRepository(Food);

  const exist = await productRepository.findOneBy({ id: id });

  if (!exist) {
    throw new AppError("This product not exist", 404);
  }

  const productQueryBuilder = productRepository.createQueryBuilder("food");

  await productQueryBuilder
    .delete()
    .from(Food.name)
    .where("id = :id", { id: id })
    .execute();

  return;
}
