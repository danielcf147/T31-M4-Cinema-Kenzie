import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from "./moviesEntity";

@Entity("categoryMovie")

export class CategoryMovie {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @OneToMany(() => Movie, movies => movies.categoryMovie)
    movies: Movie[]
}