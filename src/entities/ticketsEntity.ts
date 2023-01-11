import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Movie } from "./moviesEntity";
import { Room } from "./roomsEntity";

@Entity('tickets')
export class Ticket {

    @PrimaryColumn('uuid')
    id: string

    @ManyToOne(() => Movie , movie => movie.tickets)
    movie: Movie

    @ManyToOne(() => Room, rooms => rooms.tickets)
    room: Room
}