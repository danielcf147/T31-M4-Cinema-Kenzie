import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from "./moviesEntity";
import { Room } from "./roomsEntity";

@Entity('tickets')
export class Ticket {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Movie, movie => movie.tickets)
    movie: Movie

    @ManyToOne(() => Room, rooms => rooms.tickets)
    room: Room
}