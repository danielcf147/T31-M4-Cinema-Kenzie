import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import {
  EmployeeRegister as IEmployeeRegister,
  Employee as IEmployee,
} from "../../interfaces/user/empoyee.Interface";
import { AppError } from "../../error";
import { employeeWithoutPasswordSerializer } from "../../serializers/employee.serializer";

const createEmployeeService = async (
  data: IEmployeeRegister
): Promise<IEmployee> => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const findUser = await employeeRepository.findOneBy({
    registration: data.registration,
  });
  if (findUser !== null) {
    throw new AppError("Employee registration number already exists", 409);
  }
  const createEmployee = employeeRepository.create(data);
  await employeeRepository.save(createEmployee);

  const employeeWithoutPassword =
    await employeeWithoutPasswordSerializer.validate(createEmployee, {
      stripUnknown: true,
    });

  return employeeWithoutPassword;
};
export default createEmployeeService;
