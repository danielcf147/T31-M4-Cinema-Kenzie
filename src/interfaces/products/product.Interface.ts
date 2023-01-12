export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryFoodId: string;
}

export interface ProductCreate {
    name: string;
    price: number;
    stock: number
    categoryFoodId: string;
}

export interface ProductUpdate {
    stock?: number;
    price?: number;
}
