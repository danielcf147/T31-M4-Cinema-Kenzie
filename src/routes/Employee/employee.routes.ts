import { Router } from "express";
import createEmployeeController from "../../controllers/Employee/createEmployee.controller";
import listEmployeeController from "../../controllers/Employee/listEmployee.controller";
import updateEmployeeController from "../../controllers/Employee/updateEmployee.controller";
import deleteEmployeeController from "../../controllers/Employee/deleteEmployee.controller";
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
  ensureAuthMiddleware,
  dataIsValid(employeeSerializer),
  ensureIsAdm,
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
