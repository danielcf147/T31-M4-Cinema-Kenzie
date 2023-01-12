import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "../../interfaces/user/users.Interfaces";

const userRequestSeriallizer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().required(),
  age: yup.number().required(),
});

const userResponse: SchemaOf<IUser> = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  cpf: yup.string(),
  age: yup.number(),
  createAt: yup.date(),
});

const allUsersSerializer: SchemaOf<IUser[]> = yup.array(
  yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    cpf: yup.string(),
    age: yup.number(),
    createAt: yup.date(),
  })
);

export { userRequestSeriallizer, userResponse, allUsersSerializer };
