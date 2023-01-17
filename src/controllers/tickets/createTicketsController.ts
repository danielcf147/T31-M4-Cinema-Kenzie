import { Request, Response } from "express";
import { TicketCreate } from "../../interfaces/movie/tickets.Interface";
import { createTicketsService } from "../../services/tickets/createTickets.service";

export async function createTicketsController(req: Request, res: Response) {
    const body : TicketCreate = req.body

    const tickets = await createTicketsService(body)

    return res.status(201).json(tickets)
}