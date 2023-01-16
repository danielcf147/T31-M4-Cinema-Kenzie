import { Router } from "express";
import {
  createProductsController,
  deleteProductByIdController,
  getProductByIdController,
  getProductsByCategoryIdController,
  getProductsController,
  updateProductByIdController,
} from "../../controllers/Products/products.Controllers";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";

const productsRouters = Router();

productsRouters.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdm,
  createProductsController
);
productsRouters.get("", getProductsController);
productsRouters.get("/:id", getProductByIdController);
productsRouters.get("/category/:id", getProductsByCategoryIdController);
productsRouters.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  updateProductByIdController
);
productsRouters.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  deleteProductByIdController
);

export { productsRouters };
