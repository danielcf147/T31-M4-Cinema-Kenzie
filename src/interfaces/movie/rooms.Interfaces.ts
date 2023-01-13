import { IMovie } from "./movies.Interfaces";

export interface Rooms {
  id: string;
  name: string;
  movie_id: string;
  is3D: boolean;
  seats: number;
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
}
