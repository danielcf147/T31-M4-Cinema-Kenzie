import { Router } from "express";
import { createTicketsController } from "../../controllers/tickets/createTicketsController";
import { getAllTicketsController } from "../../controllers/tickets/getAllTicketsController";
import ensureIsEmployee from "../../middlewares/Employee/ensureIsEmployee.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";

export const ticketRoute = Router();

ticketRoute.post("", ensureAuthMiddleware, createTicketsController);
ticketRoute.get(
  "",
  ensureAuthMiddleware,
  ensureIsEmployee,
  getAllTicketsController
);
