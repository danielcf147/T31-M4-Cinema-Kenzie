import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./foodEntity";

@Entity('categoryFood')

export class CategoryFood {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => Food , food => food.categoryFood)
    food: Food[]
}