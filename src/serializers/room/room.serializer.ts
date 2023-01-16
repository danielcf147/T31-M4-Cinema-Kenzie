import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IRoomUpdate,
  RoomCreate,
} from "../../interfaces/movie/rooms.Interfaces";

const roomUpdateSerializer: SchemaOf<IRoomUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  is3D: yup.boolean().notRequired(),
  seats: yup.number().notRequired(),
  movie: yup.string().notRequired(),
});

const createRoomSerializer: SchemaOf<RoomCreate> = yup.object().shape({
  name: yup.string().required(),
  is3D: yup.boolean().required(),
  movie_id: yup.string().required(),
  seats: yup.number().required(),
});

export { roomUpdateSerializer, createRoomSerializer };
