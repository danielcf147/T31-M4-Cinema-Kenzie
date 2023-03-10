import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import { AppError } from "../../errors";

const deleteEmployeeService = async (employeeId: string) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const findEmployee = await employeeRepository.findOneBy({
    id: employeeId,
  });

  if (!findEmployee) {
    throw new AppError("User not found", 404);
  }

  if (findEmployee.isActive === false) {
    throw new AppError("User already inactive", 400);
  }

  findEmployee.isActive = false;
  await employeeRepository.save(findEmployee);

  return {};
};
export default deleteEmployeeService;
