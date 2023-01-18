import { Router } from "express";
import { getAllOrdersController } from "../../controllers/orders/getAllOrderController";
import { createOrderController } from "../../controllers/orders/orderCreateController";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureIsEmployee from "../../middlewares/Employee/ensureIsEmployee.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { orderCreateSerializer } from "../../serializers/order/order.serializer";

export const orderRoutes = Router();

orderRoutes.post("", ensureAuthMiddleware, createOrderController);
orderRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsEmployee,
  getAllOrdersController
);
