import AppDataSource from "../../data-source";
import { Room } from "../../entities/roomsEntity";
import { AppError } from "../../error";
import { RoomCreate } from "../../interfaces/movie/rooms.Interfaces";

export async function createRoomService(room: RoomCreate) {
  const { name } = room;

  const roomRepository = AppDataSource.getRepository(Room);

  const roomAlreadyExists = await roomRepository.findOneBy({ name: name });

  if (roomAlreadyExists) {
    throw new AppError("This room already exists", 409);
  }

  const newRoom = roomRepository.create(room);

  await roomRepository.save(newRoom);

  return newRoom;
}
