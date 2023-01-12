import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CategoryMovie } from "./categoryMoviesEntity";
import { Room } from "./roomsEntity";
import { Ticket } from "./ticketsEntity";

@Entity('movie')
export class Movie {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    director: string;

    @Column()
    synopsis: string;

    @Column({ type: "date" })
    release_date: string

    @ManyToOne(() => CategoryMovie, (category) => category.movies)
    categoryMovie: CategoryMovie

    @ManyToMany(() => Room, room => room.movie)
    @JoinTable()
    rooms: Room[]

    @OneToMany(() => Ticket, tickets => tickets.movie)
    tickets: Ticket[]
}