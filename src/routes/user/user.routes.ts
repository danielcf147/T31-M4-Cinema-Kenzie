import { Router } from "express";
import {
  allUserControler,
  createUserController,
  deleteUserController,
  updateUserController,
} from "../../controllers/user.controllers";
import dataIsValid from "../../middlewares/dataIsValid.middleware";
import ensureAuthMiddleware from "../../middlewares/ensureAuthToken.middleware";
import { userRequestSeriallizer } from "../../serializers/users/users.serializers";

const userRoutes = Router();

userRoutes.post("", dataIsValid(userRequestSeriallizer), createUserController);
userRoutes.get("", ensureAuthMiddleware, allUserControler);
userRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default userRoutes;
