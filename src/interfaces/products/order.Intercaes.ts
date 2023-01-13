import { Product } from "./product.Interface";

export interface Order {
  id: number;
  employee_Id?: string;
  user_ID?: string;
  status: string;
  total: number;
}

export interface OrderCrete {
  employee_id?: string;
  user_id?: string;
  status: "StandBy";
  food: Product[];
  total: number;
}

export interface OrderUpdate {
  status: "Completed" | "Cancelled";
}
