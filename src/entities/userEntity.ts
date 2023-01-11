import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Food } from "./foodEntity";
import { Order } from "./orderEntity";
import { Room } from "./roomsEntity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  cpf: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Food, (food) => food.users)
  food: Food[];

  @OneToMany(() => Room, (room) => room.user)
  room: Room[];

  @OneToOne(() => Order , order => order.user)
  order: Order

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
