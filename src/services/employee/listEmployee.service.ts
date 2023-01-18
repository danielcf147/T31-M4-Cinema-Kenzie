import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import { AppError } from "../../errors";
import { Employee as IEmployee } from "../../interfaces/user/empoyee.Interface";

const listEmployeeService = async (isAdm: boolean): Promise<IEmployee[]> => {
  if (isAdm !== true) {
    throw new AppError("Must have admin permissions", 403);
  }
  const employeeRepository = AppDataSource.getRepository(Employee);
  const listEmployee = await employeeRepository.find();

  listEmployee.forEach((element) => delete element.password);

  return listEmployee;
};
export default listEmployeeService;
