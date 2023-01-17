import { CategoryMovie } from "../category/categoryMovie.Interface";

export interface IMovie {
  id?: string;
  name: string;
  director: string;
  synopsis: string;
  release_date: string;
  categoryMovie: CategoryMovie;
}

export interface MovieRegisters {
  name: string;
  director: string;
  synopsis: string;
  release_date: string;
  categoryMovie_id: string;
}

export interface MovieReturn {
  id: string;
  name: string;
  director: string;
  synopsis: string;
  release_date: string;
  category: string;
}

export interface IMovieRoom {
  id: string;
  name: string;
  director: string;
  synopsis: string;
  release_date: string;
}
