import AppDataSource from "../../data-source";
import { Order } from "../../entities/orderEntity";

export async function getAllOrdersService(): Promise<Order[]> {
    const orderRepository = AppDataSource.getRepository(Order)

    const getOrders = orderRepository.find()

    return getOrders
}