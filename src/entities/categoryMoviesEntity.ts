import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Movie } from "./moviesEntity";

@Entity("categoryMovie")

export class CategoryMovie {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string

    @OneToMany(() => Movie , movies => movies.categoryMovie)
    movies: Movie[]
}