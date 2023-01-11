import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { IUser, IUserUpdate } from "../../interfaces/users.Interfaces";
import { userResponse } from "../../serializers/users/users.serializers";

const updateUserService = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  const updatedUser = userRepository.create({
    ...user,
    ...data,
  });
  await userRepository.save(updatedUser);

  const response = await userResponse.validate(updatedUser, {
    stripUnknown: true,
  });

  return response;
};

export default updateUserService;
