import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";
import { IEmployeeLogin } from "../../interfaces/user/empoyee.Interface";
import { Employee } from "../../entities/employeeEntity";

const createEmployeSessionService = async (
  data: IEmployeeLogin
): Promise<string> => {
  const employeeRepository = AppDataSource.getRepository(Employee);

  const employee = await employeeRepository.findOneBy({
    registration: data.registration,
  });

  if (!employee) {
    throw new AppError("Email or password invalid", 403);
  }

  const passwordMatch = await compare(data.password, employee.password);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid", 403);
  }

  if (employee.isActive === false) {
    throw new AppError("User is unactive", 400);
  }

  const token = jwt.sign({ isAdm: employee.isAdm }, process.env.SECRET_KEY, {
    subject: employee.id,
    expiresIn: "24h",
  });

  return token;
};

export default createEmployeSessionService;
