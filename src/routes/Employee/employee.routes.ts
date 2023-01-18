import { Router } from "express";
import createEmployeeController from "../../controllers/employees/createEmployee.controller";
import listEmployeeController from "../../controllers/employees/listEmployee.controller";
import updateEmployeeController from "../../controllers/employees/updateEmployee.controller";
import deleteEmployeeController from "../../controllers/employees/deleteEmployee.controller";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import {
  employeeSerializer,
  employeeUpdate,
} from "../../serializers/employee.serializer";
import ensureIsAdm from "../../middlewares/Employee/ensureIsAdm.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";

const employeeRouter = Router();

employeeRouter.post(
  "",
  dataIsValid(employeeSerializer),
  createEmployeeController
);
employeeRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdm,
  listEmployeeController
);
employeeRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  dataIsValid(employeeUpdate),
  ensureIsAdm,
  updateEmployeeController
);
employeeRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  deleteEmployeeController
);

export default employeeRouter;
