export interface Rooms {
    id: string;
    name: string;
    movie_id: string;
    is3D: boolean;
    seats: number
}

export interface RoomCreate {
    name: string;
    movie_id: string;
    is3D: boolean;
    seats: number;
}

export interface RoomUpdate {
    movie_id: string;
    is3D: boolean;
}