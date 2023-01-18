import { Router } from "express";
import { getAllOrdersController } from "../../controllers/orders/getAllOrderController";
import { createOrderController } from "../../controllers/orders/orderCreateController";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { orderCreateSerializer } from "../../serializers/order/order.serializer";

export const orderRoutes = Router();

orderRoutes.post("", ensureAuthMiddleware, createOrderController);
orderRoutes.get("", getAllOrdersController);
