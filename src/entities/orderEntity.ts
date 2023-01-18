import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Employee } from "./employeeEntity";
import { Food } from "./foodEntity";
import { User } from "./userEntity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: string;

  @Column()
  total: number;

  @ManyToMany(() => Food, (food) => food.order)
  food: Food[];

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Employee, (employee) => employee.order)
  employee: Employee;
}
