import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../error";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  user.isActive = false;
  await userRepository.save(user);

  return {};
};

export default deleteUserService;
