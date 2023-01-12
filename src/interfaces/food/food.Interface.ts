export interface Food {
    id: string;
    stock: number;
    category_food_id: string;
}

export interface FoodCreate {
    name: string;
    stock: number
    category_food_id: string;
}

export interface FoodUpdate {
    stock: number;
}
