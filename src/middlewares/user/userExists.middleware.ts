import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/userEntity";

const userExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const id = req.params.id;

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return next();
};
export default userExistsMiddleware;
