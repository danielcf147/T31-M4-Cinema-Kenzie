export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  cpf: string;
  createdAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  cpf?: string;
}
