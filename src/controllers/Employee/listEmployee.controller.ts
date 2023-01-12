import listEmployeeService from "../../services/Employee/listEmployee.service";
import { Request, Response } from "express";

const listEmployeeController = async (request: Request, response: Response) => {
  const isAdm = request.user.isAdm;
  const listEmployee = await listEmployeeService(isAdm);
  return response.json(listEmployee);
};
export default listEmployeeController;
