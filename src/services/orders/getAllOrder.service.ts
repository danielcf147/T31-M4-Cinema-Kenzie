import AppDataSource from "../../data-source";
import { Order } from "../../entities/orderEntity";

export async function getAllOrdersService(): Promise<Order[]> {
  const orderRepository = AppDataSource.getRepository(Order);

  const getOrders = await orderRepository
    .createQueryBuilder("orders")
    .leftJoinAndSelect("orders.user", "user")
    .leftJoinAndSelect("orders.employee", "employee")
    .select([
      "orders",
      "employee.id",
      "employee.name",
      "employee.registration",
      "user.id",
      "user.name",
    ])
    .getMany();

  return getOrders;
}
