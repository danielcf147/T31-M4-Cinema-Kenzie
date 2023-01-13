import {
  EmployeeRegister as IEmployeeRegister,
  IEmployeeLogin,
} from "../../interfaces/user/empoyee.Interface";
import {
  IUserRequest,
  IUserLogin,
} from "../../interfaces/user/users.Interfaces";

export const mockedUser: IUserRequest = {
  name: "Joana",
  email: "joana@mail.com",
  password: "123456",
  age: 25,
  cpf: "99999999999",
};

export const mockedAdmin: IEmployeeRegister = {
  name: "Felipe",
  registration: "1",
  password: "123456",
  age: 25,
  isAdm: true,
};

export const mockedUserLogin: IUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedAdminLogin: IEmployeeLogin = {
  registration: "1",
  password: "123456",
};
