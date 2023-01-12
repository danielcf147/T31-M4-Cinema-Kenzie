import { Router } from "express";
import { CreateRoomController } from "../../controllers/room/createRoom.controller";
import { getAllRoomsController } from "../../controllers/room/getRoom.controller";

export const roomRoute = Router()

roomRoute.post('' , CreateRoomController)
roomRoute.get('' , getAllRoomsController)