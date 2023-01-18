import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user/users.Interfaces";
import createUserService from "../../services/users/createUser.service";
import deleteUserService from "../../services/users/deleteUser.service";
import getAllUsersService from "../../services/users/getAllUsers.service";
import updateUserService from "../../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const allUserControler = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersService();
  return res.status(200).json(allUsers);
};

const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = await updateUserService(id, data);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await deleteUserService(id);
  return res.status(204).json(deletedUser);
};

export {
  createUserController,
  allUserControler,
  updateUserController,
  deleteUserController,
};
