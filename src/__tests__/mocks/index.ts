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

export const mockedUser2: IUserRequest = {
  name: "Joao",
  email: "joao@mail.com",
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

export const mockedEmployee: IEmployeeRegister = {
  name: "Pedro",
  registration: "2",
  password: "123456",
  age: 20,
  isAdm: false,
};

export const mockedEmployee2: IEmployeeRegister = {
  name: "Jana",
  registration: "3",
  password: "123456",
  age: 21,
  isAdm: false,
};

export const mockedUserLogin: IUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedUserLogin2: IUserLogin = {
  email: "joao@mail.com",
  password: "123456",
};

export const mockedAdminLogin: IEmployeeLogin = {
  registration: "1",
  password: "123456",
};

export const mockedEmployeeLogin: IEmployeeLogin = {
  registration: "2",
  password: "123456",
};

export const mockedEmployeeLogin2: IEmployeeLogin = {
  registration: "3",
  password: "123456",
};
