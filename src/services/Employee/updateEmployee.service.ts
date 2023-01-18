import { Employee } from "../../entities/employeeEntity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";
import { employeeWithoutPasswordSerializer } from "../../serializers/employee.serializer";
import {
  EmployeeUpdate as IEmployeeUpdate,
  Employee as IEmployee,
} from "../../interfaces/user/empoyee.Interface";

const updateEmployeeService = async (
  data: IEmployeeUpdate,
  employeeId: string
): Promise<IEmployee> => {
  const keys = Object.keys(data);

  const invalidKey = keys.find((key) => {
    return key === "id";
  });

  if (invalidKey) {
    throw new AppError("Cant update id", 401);
  }
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
