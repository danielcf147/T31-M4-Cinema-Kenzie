import { Request, Response } from "express";
import { getAllRoomsService } from "../../services/rooms/getRoom.service";

export async function getAllRoomsController(req: Request, res: Response) {
  const rooms = await getAllRoomsService();

  return res.status(201).json(rooms);
}