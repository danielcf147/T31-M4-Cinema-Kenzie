import deleteEmployeeService from "../../services/employee/deleteEmployee.service";
import { Request, Response } from "express";

const deleteEmployeeController = async (
  request: Request,
  response: Response
) => {
  const deleteEmployee = await deleteEmployeeService(request.params.id);
  return response.status(204).json(deleteEmployee);
};
export default deleteEmployeeController;
