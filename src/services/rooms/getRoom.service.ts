import AppDataSource from "../../data-source";
import { Room } from "../../entities/roomsEntity";

export async function getAllRoomsService(): Promise<Room[]> {
  const roomRepository = AppDataSource.getRepository(Room);

  const room = await roomRepository
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
    .getMany();

  return room;
}
