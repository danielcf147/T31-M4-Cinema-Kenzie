import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../error";
import { IUser, IUserUpdate } from "../../interfaces/user/users.Interfaces";
import { userResponse } from "../../serializers/users/users.serializers";

const updateUserService = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

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
