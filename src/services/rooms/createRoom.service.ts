import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import { Movie } from "../../entities/moviesEntity";
import { Room } from "../../entities/roomsEntity";
import { AppError } from "../../error";
import { RoomCreate, Rooms } from "../../interfaces/movie/rooms.Interfaces";

export async function createRoomService(employerId: string, room: RoomCreate) {
  const roomRepository = AppDataSource.getRepository(Room);
  const employerRepository = AppDataSource.getRepository(Employee);
  const movieRepository = AppDataSource.getRepository(Movie);

  const employer = await employerRepository.findOneBy({
    id: employerId,
  });

  const movie = await movieRepository.findOneBy({
    id: room.movie_id,
  });

  if (!movie) {
    throw new AppError("Movie doesn't exist", 404);
  }

  const roomAlreadyExists = await roomRepository.findOneBy({
    name: room.name,
  });

  if (roomAlreadyExists) {
    throw new AppError("This room already exists", 409);
  }

  const newRoom = roomRepository.create({
    ...room,
    movie: [movie],
    employee: [employer],
  });

  await roomRepository.save(newRoom);

  const roomResponse = await roomRepository
    .createQueryBuilder("rooms")
    .innerJoinAndSelect("rooms.movie", "movie")
    .innerJoinAndSelect("rooms.employee", "employee")
    .select([
      "rooms",
      "movie",
      "employee.id",
      "employee.name",
      "employee.registration",
    ])
    .where("rooms.id = :idRoom", { idRoom: newRoom.id })
    .getOne();

  return roomResponse;
}
