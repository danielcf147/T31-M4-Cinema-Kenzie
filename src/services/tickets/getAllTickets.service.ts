import AppDataSource from "../../data-source";
import { Ticket } from "../../entities/ticketsEntity";

export async function getAllTicketsService(): Promise<Ticket[]> {

    const ticketRepository = AppDataSource.getRepository(Ticket)

    const ticket = ticketRepository.find({
        relations:{movie : true,
        room: true}
    })

    return ticket
}