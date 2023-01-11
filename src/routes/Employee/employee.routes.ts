import { Router } from "express";
import createEmployeeController from "../../controllers/Employee/createEmployee.controller";

const employeeRouter = Router();

employeeRouter.post("", createEmployeeController);

export default employeeRouter;
