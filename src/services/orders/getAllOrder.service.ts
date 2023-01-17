import AppDataSource from "../../data-source";
import { Order } from "../../entities/orderEntity";

export async function getAllOrdersService(): Promise<Order[]> {
  const orderRepository = AppDataSource.getRepository(Order);

  const getOrders = await orderRepository
    .createQueryBuilder("orders")
    .innerJoinAndSelect("orders.user", "user")
    .innerJoinAndSelect("orders.employee", "employee")
    // .select([
    //   "orders",
    //   "employee.id",
    //   "employee.name",
    //   "employee.registration",
    //   "user.id",
    //   "user.name",
    // ])
    .getMany();

  //   console.log(getOrders);
  // const getOrders = orderRepository.find({
  //   relations: {
  //     user: true,
  //     employee: true,
  //   },
  // });

  return getOrders;
}
