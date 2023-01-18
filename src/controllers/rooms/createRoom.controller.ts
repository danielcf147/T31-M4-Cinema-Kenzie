import { Request, Response } from "express";
import { RoomCreate } from "../../interfaces/movie/rooms.Interfaces";
import { createRoomService } from "../../services/rooms/createRoom.service";

export async function CreateRoomController(req: Request, res: Response) {
  const room: RoomCreate = req.body;
  const employerId = req.user.id;
  const newRoom = await createRoomService(employerId, room);

  return res.status(201).json(newRoom);
}
