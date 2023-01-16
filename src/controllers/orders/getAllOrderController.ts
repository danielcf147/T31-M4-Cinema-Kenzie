import { Request, Response } from "express";
import { getAllOrdersService } from "../../services/orders/getAllOrder.service";

export async function getAllOrdersController(req:Request , res: Response) {
    const orders = await getAllOrdersService()

    return res.status(200).json(orders)
}