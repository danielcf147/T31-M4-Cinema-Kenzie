import { Employee } from "../../entities/employeeEntity";
import AppDataSource from "../../data-source";
import { AppError } from "../../error";
import { employeeWithoutPasswordSerializer } from "../../serializers/employee.serializer";
import {
  EmployeeUpdate as IEmployeeUpdate,
  Employee as IEmployee,
} from "../../interfaces/user/empoyee.Interface";

const updateEmployeeService = async (
  data: IEmployeeUpdate,
  employeeId: string
): Promise<IEmployee> => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const findEmployee = await employeeRepository.findOneBy({
    id: employeeId,
  });

  if (findEmployee === undefined || findEmployee === null) {
    throw new AppError("User not found", 404);
  }

  const updateUser = employeeRepository.create({
    ...findEmployee,
    updatedAt: new Date(),
    ...data,
  });
  await employeeRepository.save(updateUser);

  const updateEmployeeWithoutPassword =
    await employeeWithoutPasswordSerializer.validate(updateUser, {
      stripUnknown: true,
    });

  return updateEmployeeWithoutPassword;
};
export default updateEmployeeService;
