import { Router } from "express";
import { CreateRoomController } from "../../controllers/rooms/createRoom.controller";
import { getAllRoomsController } from "../../controllers/rooms/getRoom.controller";
import { updateRoomController } from "../../controllers/rooms/updateRoom.controller";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import {
  createRoomSerializer,
  roomUpdateSerializer,
} from "../../serializers/room/room.serializer";

export const roomRoute = Router();

roomRoute.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdm,
  dataIsValid(createRoomSerializer),
  CreateRoomController
);
roomRoute.get("", getAllRoomsController);
roomRoute.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  dataIsValid(roomUpdateSerializer),
  updateRoomController
);
