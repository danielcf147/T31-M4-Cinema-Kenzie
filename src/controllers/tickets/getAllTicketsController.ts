import { Request, Response } from "express";
import { getAllTicketsService } from "../../services/tickets/getAllTickets.service";

export async function getAllTicketsController(req: Request, res: Response) {

  const ticket = await getAllTicketsService();

  return res.status(200).json(ticket);
}
