import AppDataSource from "../../data-source";
import { Movie } from "../../entities/moviesEntity";
import { Room } from "../../entities/roomsEntity";
import { Ticket } from "../../entities/ticketsEntity";
import { AppError } from "../../error";
import { TicketCreate } from "../../interfaces/movie/tickets.Interface";

export async function createTicketsService(ticket: TicketCreate) {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const movieRepository = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOneBy({ id: ticket.movie_id });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  const roomRepository = AppDataSource.getRepository(Room);

  const findRoom = await roomRepository.findOneBy({ id: ticket.room_id });

  if (!findRoom) {
    throw new AppError("Room not found", 404);
  }

  if (findRoom.available_seats === 0) {
    throw new AppError("Full room", 404);
  }

  const newTicket = ticketRepository.create({
    movie: findMovie,
    room: findRoom,
  });

  await ticketRepository.save(newTicket);

  await roomRepository.save({
    ...findRoom,
    available_seats: findRoom.available_seats - 1,
  });

  return newTicket;
}
