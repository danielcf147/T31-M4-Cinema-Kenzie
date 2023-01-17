import { Request, Response } from "express";
import { OrderCreate } from "../../interfaces/order.intercaes";
import { createOrderService } from "../../services/orders/createOrder.service";

export async function createOrderController(req: Request, res: Response) {
  const order: OrderCreate = req.body;
  console.log(order);
  const userId = req.user.id;
  const newRoom = await createOrderService(order, userId);

  return res.status(201).json(newRoom);
}
