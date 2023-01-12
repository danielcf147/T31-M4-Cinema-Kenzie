import { Router } from "express";
import { createProductCategoryController, getProductCategoryByIdController, getProductCategoryController } from "../../controllers/CategoryProducts/CategoryProducts.Controllers";
import { getProductsByCategoryIdController } from "../../controllers/Products/products.Controllers";

const categoryProductsRoutes = Router()

categoryProductsRoutes.post("", createProductCategoryController)

categoryProductsRoutes.get("", getProductCategoryController)

categoryProductsRoutes.get("/:id", getProductCategoryByIdController)


export { categoryProductsRoutes }