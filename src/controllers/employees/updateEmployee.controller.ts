import updateEmployeeService from "../../services/employee/updateEmployee.service";
import { Request, Response } from "express";

const updateEmployeeController = async (
  request: Request,
  response: Response
) => {
  const employeeID = request.params.id;
  const updateData = request.body;
  const updateEmployee = await updateEmployeeService(updateData, employeeID);
  return response.status(200).json(updateEmployee);
};
export default updateEmployeeController;
