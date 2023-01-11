import { Column, Entity, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employeeEntity";
import { Food } from "./foodEntity";
import { User } from "./userEntity";

@Entity("orders")
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    status: string

    @Column()
    total: number

    @ManyToMany(() => Food, food => food.order)
    food: Food[]

    @OneToOne(() => User, user => user.order)
    user: User

    @ManyToMany(() => Employee, employee => employee.order)
    employee: Employee[]
}
