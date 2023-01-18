import { IMovie } from "./movies.Interfaces";

export interface Rooms {
  id?: string;
  name: string;
  movie: IMovie[];
  is3D: boolean;
  seats: number;
  available_seats: number;
}

export interface RoomCreate {
  name: string;
  movie_id: string;
  is3D: boolean;
  seats: number;
}

export interface IRoomUpdate {
  is3D?: boolean;
  name?: string;
  seats?: number;
  movie?: string;
  available_seats?: number;
}

export interface IRoomUpdate2 {
  is3D?: boolean;
  name?: string;
  seats?: number;
  available_seats?: number;
}

export interface IRoomUpdateResponse {
  id: string;
  name: string;
  is3D: boolean;
  seats: number;
  available_seats: number;
}

export interface IRoomUpdateMovieResponse {
  id: string;
  name: string;
  movie: Array<IMovie>;
  is3D: boolean;
  seats: number;
}
