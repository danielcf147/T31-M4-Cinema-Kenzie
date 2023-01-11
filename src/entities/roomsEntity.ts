import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Employee } from "./employeeEntity";
import { Movie } from "./moviesEntity";
import { Ticket } from "./ticketsEntity";
import { User } from "./userEntity";

@Entity('rooms')
export class Room {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    is3D: boolean;

    @Column()
    seats: number;

    @ManyToMany(() => Movie, movies => movies.rooms)
    movie: Movie[]

    @OneToMany(() => Ticket, tickets => tickets.room)
    tickets: Ticket[]

    @ManyToMany(() => Employee, employee => employee.rooms)
    employee: Employee[]

    @ManyToOne(() => User , user => user.room)
    user: User
}