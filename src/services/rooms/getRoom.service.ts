import AppDataSource from '../../data-source'
import { Room } from '../../entities/roomsEntity'


export async function getAllRoomsService(): Promise<Room[]> {
    const roomRepository = AppDataSource.getRepository(Room)

    const room = roomRepository.find()

    return room
}