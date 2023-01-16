import { Router } from "express";
import { getAllOrdersController } from "../../controllers/orders/getAllOrderController";
import { createOrderController } from "../../controllers/orders/orderCreateController";

export const orderRoutes = Router()

orderRoutes.post("" , createOrderController)
orderRoutes.get("", getAllOrdersController)