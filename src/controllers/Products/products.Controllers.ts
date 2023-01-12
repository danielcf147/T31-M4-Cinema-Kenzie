import { Request, Response } from "express";
import { ProductCreate, Product, ProductUpdate, ProductReturn } from "../../interfaces/products/product.Interface";
import { createProductsService } from "../../services/Products/createProducts.Service";
import { deleteProductByIdService } from "../../services/Products/deleteProductById.Service";
import { getProductByIdService } from "../../services/Products/getProductById.Service";
import { getProductsService } from "../../services/Products/getProducts.Service";
import { getProductsByCategoryIdService } from "../../services/Products/getProductsByCategoryId.Service";
import { updateProductByIdService } from "../../services/Products/updateProductById.Service";

export async function createProductsController(req: Request, res: Response) {
    const product: ProductCreate = req.body

    const newProduct = await createProductsService(product)

    return res.status(201).json(newProduct)
}

export async function getProductsController(req: Request, res: Response) {
    const products = await getProductsService()

    return res.status(200).json(products)
}

export async function getProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id

    const product = await getProductByIdService(id)

    return res.status(200).json(product)
}

export async function updateProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id
    const update: ProductUpdate = req.body

    const updateProduct: Product = await updateProductByIdService(id, update)

    return res.status(200).json(updateProduct)
}

export async function deleteProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id

    const deleteProduct = await deleteProductByIdService(id)

    return res.status(200).json(deleteProduct)
}

export async function getProductsByCategoryIdController(req: Request, res: Response) {
    const id: string = req.params.id
    console.log(id)

    const products: Product[] = await getProductsByCategoryIdService(id)

    return res.status(200).json(products)
}