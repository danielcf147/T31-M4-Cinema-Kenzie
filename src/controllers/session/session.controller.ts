import { Request, Response } from "express";
import { IEmployeeLogin } from "../../interfaces/user/empoyee.Interface";
import { IUserLogin } from "../../interfaces/user/users.Interfaces";
import createEmployeSessionService from "../../services/login/createEemployerSession";
import createSessionService from "../../services/login/createSession";

const createSessionController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const token = await createSessionService(data);
  return res.status(200).json({ token });
};

const employerSessionController = async (req: Request, res: Response) => {
  const data: IEmployeeLogin = req.body;
  const token = await createEmployeSessionService(data);
  return res.status(200).json({ token });
};

export { createSessionController, employerSessionController };
