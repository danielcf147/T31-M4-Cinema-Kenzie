import { Router } from "express";
import {
  createProductCategoryController,
  getProductCategoryByIdController,
  getProductCategoryController,
} from "../../controllers/CategoryProducts/CategoryProducts.Controllers";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { categoryProductCreateSerializer } from "../../serializers/categoryProduct/categoryMovie.serializer";

const categoryProductsRoutes = Router();

categoryProductsRoutes.post(
  "",
  dataIsValid(categoryProductCreateSerializer),
  ensureAuthMiddleware,
  ensureIsAdm,
  createProductCategoryController
);

categoryProductsRoutes.get("", getProductCategoryController);

categoryProductsRoutes.get("/:id", getProductCategoryByIdController);

export { categoryProductsRoutes };
