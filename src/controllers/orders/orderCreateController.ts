import { Request, Response } from "express";
import { OrderCrete } from "../../interfaces/order.intercaes";
import { createOrderService } from "../../services/orders/createOrder.service";

export async function createOrderController(req: Request , res: Response) {
    const order : OrderCrete = req.body
    
    const newRoom = await createOrderService(order)

    return res.status(201).json(newRoom)
}