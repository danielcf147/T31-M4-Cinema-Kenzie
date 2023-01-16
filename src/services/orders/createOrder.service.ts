import AppDataSource from "../../data-source";
import { Order } from "../../entities/orderEntity";
import { OrderCrete } from "../../interfaces/order.intercaes";

export async function createOrderService(order: OrderCrete) {
  const orderRepository = AppDataSource.getRepository(Order);

  const newOrder = orderRepository.create(order);

  await orderRepository.save(newOrder);

  return newOrder;
}