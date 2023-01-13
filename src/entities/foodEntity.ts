import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryFood } from "./categoryFoodEntity";
import { Order } from "./orderEntity";
import { User } from "./userEntity";

@Entity('foods')
export class Food {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    stock: number

    @Column()
    price: number

    @ManyToOne(() => CategoryFood, categories => categories.food)
    categoryFood: CategoryFood

    @ManyToOne(() => User, users => users.food)
    users: User

    @ManyToMany(() => Order, order => order.food)
    @JoinTable()
    order: Order[]
}