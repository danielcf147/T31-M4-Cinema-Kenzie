import { Router } from "express";
import { CreateRoomController } from "../../controllers/room/createRoom.controller";

export const roomRoute = Router()

roomRoute.post('' , CreateRoomController)