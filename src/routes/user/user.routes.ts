import { Router } from "express";
import {
  allUserControler,
  createUserController,
  deleteUserController,
  updateUserController,
} from "../../controllers/user.controllers";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import isAdmOrSameUserMiddleware from "../../middlewares/user/isAdm.sameUser.middleware";
import userExistsMiddleware from "../../middlewares/user/userExists.middleware";
import { userRequestSeriallizer } from "../../serializers/users/users.serializers";

const userRoutes = Router();

userRoutes.post("", dataIsValid(userRequestSeriallizer), createUserController);
userRoutes.get("", ensureAuthMiddleware, allUserControler);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  userExistsMiddleware,
  isAdmOrSameUserMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  userExistsMiddleware,
  isAdmOrSameUserMiddleware,
  deleteUserController
);

export default userRoutes;
