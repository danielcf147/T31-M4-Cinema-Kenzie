import { Product } from "./products/product.Interface";

export interface Order {
  id: number;
  employee_Id?: string;
  user_ID?: string;
  status: string;
  total: number;
}

export interface OrderProductCreate {
  name: string;
  price: number;
  stock: number;
}

export interface OrderCreate {
  employee?: string;
  user?: string;
  status: string;
  food: OrderProductCreate[];
  total: number;
}

export interface OrderUpdate {
  status: "Completed" | "Cancelled";
}
