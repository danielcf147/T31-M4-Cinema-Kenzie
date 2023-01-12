import { Router } from "express";
import createEmployeeController from "../../controllers/Employee/createEmployee.controller";
import listEmployeeController from "../../controllers/Employee/listEmployee.controller";
import updateEmployeeController from "../../controllers/Employee/updateEmployee.controller";
import deleteEmployeeController from "../../controllers/Employee/deleteEmployee.controller";

const employeeRouter = Router();

employeeRouter.post("", createEmployeeController);
employeeRouter.get("", listEmployeeController);
employeeRouter.patch("/:id", updateEmployeeController);
employeeRouter.delete("/:id", deleteEmployeeController);

export default employeeRouter;
