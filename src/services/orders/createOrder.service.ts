import { Product } from './../../interfaces/products/product.Interface';
import { Food } from './../../entities/foodEntity';
import { EntityTarget, ObjectLiteral } from "typeorm";
import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import { Order } from "../../entities/orderEntity";
import { User } from "../../entities/userEntity";
import { AppError } from "../../error";
import { OrderCreate, OrderProductCreate } from '../../interfaces/order.intercaes';

export async function createEmployeeOrUser(id: string): Promise<Array<ObjectLiteral | string>> {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const findEmployee = await employeeRepository.findOneBy({ id });

  if (findEmployee) {
    return [findEmployee, "employee"]
  }

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (findUser) {
    return [findUser, "user"]
  }

  throw new AppError("ID not found", 404);
}

export async function productValidate(products: OrderProductCreate[]) {
  const productsRepository = AppDataSource.getRepository(Food)
  const foods: Food[] = []

  for await (const { id, total } of products) {

    const validProduct = await productsRepository.findOneBy({ id: id })

    if (!validProduct) {
      throw new AppError("Product not found", 404)
    }

    if (validProduct.stock === 0) {
      throw new AppError("Stock Empty", 403)
    }

    if (validProduct.stock < total) {
      throw new AppError("insufficient stock products", 403)
    }

    const stock = validProduct.stock - total
    validProduct.stock = stock

    foods.push(await productsRepository.save(validProduct))

  }

  return foods

}

export async function createOrderService({ food, status }: OrderCreate, tokenId: string): Promise<Order> {

  const orderRepository = AppDataSource.getRepository(Order);

  let newOrder: Order;

  let [entity, userType] = await createEmployeeOrUser(tokenId)
  const products = await productValidate(food)

  if (userType === "user") {
    newOrder = orderRepository.create({ status, user: entity as User, food: products });
  } else {
    newOrder = orderRepository.create({ status, employee: entity as Employee, food: products });

  }

  return await orderRepository.save(newOrder);

}
