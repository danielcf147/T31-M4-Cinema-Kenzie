import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRoomUpdate } from "../../interfaces/movie/rooms.Interfaces";

const roomUpdateSerializer: SchemaOf<IRoomUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  is3D: yup.boolean().notRequired(),
  seats: yup.number().notRequired(),
  movie: yup.string().notRequired(),
});

export { roomUpdateSerializer };
