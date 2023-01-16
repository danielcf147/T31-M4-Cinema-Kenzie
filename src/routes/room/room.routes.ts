import { Router } from "express";
import { CreateRoomController } from "../../controllers/room/createRoom.controller";
import { getAllRoomsController } from "../../controllers/room/getRoom.controller";
import { updateRoomController } from "../../controllers/room/updateRoom.controller";
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
