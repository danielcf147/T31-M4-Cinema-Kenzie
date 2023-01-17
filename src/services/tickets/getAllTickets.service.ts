import AppDataSource from "../../data-source";
import { Ticket } from "../../entities/ticketsEntity";

export async function getAllTicketsService(): Promise<Ticket[]> {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const ticket = ticketRepository
    .createQueryBuilder("ticket")
    .innerJoinAndSelect("ticket.movie", "movie")
    .innerJoinAndSelect("ticket.room", "room")
    .select([
      "ticket",
      "movie.name",
      "movie.id",
      "room.name",
      "room.id",
      "room.is3D",
    ])
    .getMany();

  return ticket;
}
