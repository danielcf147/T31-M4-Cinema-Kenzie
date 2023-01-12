import { Request, Response } from "express";
import { ProductCreate, Product, ProductUpdate } from "../../interfaces/products/product.Interface";
import { createProductsService } from "../../services/Products/createProducts.Service";

export async function createProductsController(req: Request, res: Response) {
    const product: ProductCreate = req.body

    const newProduct = await createProductsService(product)

    return res.status(201).json(newProduct)
}

export async function getProductsController(req: Request, res: Response) {
    const products: Product[] = []

    return res.status(200).json(products)
}

export async function getProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id

    const product = id

    return res.status(200).json(product)
}

export async function updateProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id
    const product: ProductUpdate = req.body

    const updateProduct = product

    return res.status(200).json(updateProduct)
}

export async function deleteProductByIdController(req: Request, res: Response) {
    const id: string = req.params.id

    const deleteProduct = id

    return res.status(200).json(deleteProduct)
}

export async function getProductsByCategoryIdController(req: Request, res: Response) {
    const id: string = req.params.id

    const products: Product[] = []

    return res.status(200).json(products)
}