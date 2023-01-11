import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { IUser } from "../../interfaces/users.Interfaces";
import { allUsersSerializer } from "../../serializers/users/users.serializers";

const getAllUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const allUser = await allUsersSerializer.validate(users, {
    stripUnknown: true,
  });

  return allUser;
};

export default getAllUsersService;
