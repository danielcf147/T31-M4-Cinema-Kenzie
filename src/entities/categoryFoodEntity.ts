import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Food } from "./foodEntity";

@Entity('categoryFood')

export class CategoryFood {

    @PrimaryColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => Food , food => food.categoryFood)
    food: Food[]
}