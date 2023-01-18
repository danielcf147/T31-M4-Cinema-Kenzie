import { Product } from "../products/product.Interface";

export interface Order {
  id: number;
  employee_Id?: string;
  user_ID?: string;
  status: string;
  total: number;
}

export interface OrderProductCreate {
  id: string;
  total: number;
}

export interface OrderCreate {
  status: string;
  food: OrderProductCreate[];
}

export interface OrderUpdate {
  status: "Completed" | "Cancelled";
}
