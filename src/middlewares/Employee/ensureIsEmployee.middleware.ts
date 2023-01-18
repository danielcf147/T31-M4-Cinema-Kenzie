import { Employee } from "../../entities/employeeEntity";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";
import AppDataSource from "../../data-source";

const ensureIsEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const findEmployee = await employeeRepository.findOneBy({
    id: request.user.id,
  });

  if (findEmployee) {
    return next();
  }

  return response.status(403).json({
    message: "You must be employee to access this route.",
  });
};

export default ensureIsEmployee;
