import AppDataSource from "../../data-source";
import { Movie } from "../../entities/moviesEntity";
import { Room } from "../../entities/roomsEntity";
import { AppError } from "../../error";
import { IRoomUpdate } from "../../interfaces/movie/rooms.Interfaces";

const updateRoomService = async (roomId: string, data: IRoomUpdate) => {
  const roomRepository = AppDataSource.getRepository(Room);
  const movieRepository = AppDataSource.getRepository(Movie);

  const room = await roomRepository.findOneBy({
    id: roomId,
  });

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  if (data.movie) {
    const movie = await movieRepository.findOneBy({
      id: data.movie,
    });

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    const ob: any = data;
    ob.movie = movie;

    const updatedRoom = roomRepository.create({
      ...room,
      ...ob,
    });
    await roomRepository.save(updatedRoom);

    return updatedRoom;
  }

  const auxData: any = data;
  const updatedRoom = roomRepository.create({
    ...room,
    ...auxData,
  });
  await roomRepository.save(updatedRoom);

  return updatedRoom;
};

export default updateRoomService;
