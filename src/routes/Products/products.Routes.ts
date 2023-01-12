import { Router } from "express";
import { createProductsController, deleteProductByIdController, getProductByIdController, getProductsByCategoryIdController, getProductsController, updateProductByIdController } from "../../controllers/Products/products.Controllers";

const productsRouters = Router()

productsRouters.post("", createProductsController)
productsRouters.get("", getProductsController)
productsRouters.get("/:id", getProductByIdController)
productsRouters.patch("/:id", updateProductByIdController)
productsRouters.delete("/:id", deleteProductByIdController)
productsRouters.get("/category/:id", getProductsByCategoryIdController)


export { productsRouters }