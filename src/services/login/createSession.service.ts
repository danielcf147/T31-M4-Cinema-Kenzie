import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/user/users.Interfaces";

const createSessionService = async (data: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: data.email,
  });

  if (!user) {
    throw new AppError("Email or password invalid", 403);
  }

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid", 403);
  }

  if (user.isActive === false) {
    throw new AppError("User is unactive", 400);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};

export default createSessionService;
