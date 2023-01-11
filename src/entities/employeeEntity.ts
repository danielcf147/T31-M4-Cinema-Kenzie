import { hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntity";
import { Room } from "./roomsEntity";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    registration: string

    @Column()
    age: number

    @Column()
    isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @Column()
    password: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @ManyToMany(() => Room, room => room.employee)
    @JoinTable()
    rooms: Room[]

    @ManyToMany(() => Order, order => order.employee)
    order: Order[]

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

}