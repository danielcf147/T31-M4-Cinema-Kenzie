import { Router } from "express";
import {
  createSessionController,
  employerSessionController,
} from "../../controllers/sessions/session.controller";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import employerLoginSerializer from "../../serializers/login/employerLogin.serializer";
import userLoginSerializer from "../../serializers/login/userLogin.serializer";

const sessionRoute = Router();

sessionRoute.post(
  "",
  dataIsValid(userLoginSerializer),
  createSessionController
);
sessionRoute.post(
  "/employer",
  dataIsValid(employerLoginSerializer),
  employerSessionController
);

export default sessionRoute;
