import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../error";
import { IUser, IUserRequest } from "../../interfaces/users.Interfaces";
import { userResponse } from "../../serializers/users/users.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const email = userData.email;

  const emailUnavailable = await userRepository.findOneBy({
    email: email,
  });

  if (emailUnavailable) {
    throw new AppError("User already exists", 409);
  }

  const user = userRepository.create(userData);
  await userRepository.save(user);

  const response = await userResponse.validate(user, {
    stripUnknown: true,
  });

  return response;
};

export default createUserService;
