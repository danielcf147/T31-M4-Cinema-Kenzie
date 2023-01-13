import { Request, Response } from "express";
import { IRoomUpdate } from "../../interfaces/movie/rooms.Interfaces";
import updateRoomService from "../../services/rooms/updateRoom.service";

const updateRoomController = async (req: Request, res: Response) => {
  const data: IRoomUpdate = req.body;
  const roomId: string = req.params.id;
  const updatedRoom = await updateRoomService(roomId, data);
  return res.status(200).json(updatedRoom);
};

export { updateRoomController };
