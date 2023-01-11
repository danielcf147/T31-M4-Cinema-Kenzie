import createEmployeeService from "../../services/Employee/createEmployee.service";
import { Request, Response } from "express";
import { EmployeeRegister as IEmployeeRegister } from "../../interfaces/user/empoyee.Interface";

const createEmployeeController = async (
  request: Request,
  response: Response
) => {
  const employeeData: IEmployeeRegister = request.body;
  const newEmployee = await createEmployeeService(employeeData);
  return response.status(201).json(newEmployee);
};
export default createEmployeeController;
