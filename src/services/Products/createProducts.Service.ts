import { AppError } from "../../errors/index";
import {
  Product,
  ProductCreate,
} from "./../../interfaces/products/product.Interface";
import AppDataSource from "../../data-source";
import { Food } from "../../entities/foodEntity";
import { CategoryFood } from "../../entities/categoryFoodEntity";

export async function createProductsService(data: ProductCreate) {
  const productsRepository = AppDataSource.getRepository(Food);
  const productsCategoriesRepository =
    AppDataSource.getRepository(CategoryFood);

  const validCategory = productsCategoriesRepository.findAndCountBy({
    id: data.categoryFoodId,
  });

  if (!validCategory) {
    throw new AppError("Category not found", 404);
  }

  const exist = await productsRepository.findOneBy({ name: data.name });

  if (exist) {
    throw new AppError("This product is already in the list of products", 409);
  }

  const productData: any = {
    name: data.name,
    price: data.price,
    stock: data.stock,
    categoryFood: data.categoryFoodId,
  };

  const newProduct = productsRepository.create(productData);

  await productsRepository.save(newProduct);

  return newProduct;
}
