export interface Ticket {
    id: string;
    room_id: string;
    movie_id: string;
}

export interface TicketCreate {
    room_id: string;
    movie_id: string;
}