import { Request, Response } from "express";
import {
  ProductCreate,
  Product,
  ProductUpdate,
  ProductReturn,
} from "../../interfaces/products/product.Interface";
import { createProductsService } from "../../services/products/createProducts.Service";
import { deleteProductByIdService } from "../../services/products/deleteProductById.Service";
import { getProductByIdService } from "../../services/products/getProductById.Service";
import { getProductsService } from "../../services/products/getProducts.Service";
import { getProductsByCategoryIdService } from "../../services/products/getProductsByCategoryId.Service";
import { updateProductByIdService } from "../../services/products/updateProductById.Service";

export async function createProductsController(req: Request, res: Response) {
  const product: ProductCreate = req.body;

  const newProduct = await createProductsService(product);

  return res.status(201).json(newProduct);
}

export async function getProductsController(req: Request, res: Response) {
  const products = await getProductsService();

  return res.status(200).json(products);
}

export async function getProductByIdController(req: Request, res: Response) {
  const id: string = req.params.id;

  const product = await getProductByIdService(id);

  return res.status(200).json(product);
}

export async function updateProductByIdController(req: Request, res: Response) {
  const id: string = req.params.id;
  const update: ProductUpdate = req.body;

  const updateProduct: Product = await updateProductByIdService(id, update);

  return res.status(200).json(updateProduct);
}

export async function deleteProductByIdController(req: Request, res: Response) {
  const id: string = req.params.id;

  const deleteProduct = await deleteProductByIdService(id);

  return res.status(204).json(deleteProduct);
}

export async function getProductsByCategoryIdController(
  req: Request,
  res: Response
) {
  const id: string = req.params.id;

  const products: Product[] = await getProductsByCategoryIdService(id);

  return res.status(200).json(products);
}
