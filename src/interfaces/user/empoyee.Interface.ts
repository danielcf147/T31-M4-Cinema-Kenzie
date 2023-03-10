export interface Employee {
  id: string;
  name: string;
  registration: string;
  age: number;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeRegister {
  name: string;
  registration: string;
  age: number;
  isAdm: boolean;
  password: string;
}

export interface EmployeeUpdate {
  name?: string;
  age?: number;
  isAdm?: boolean;
  password?: string;
  id?: string;
  isActive: boolean;
}

export interface IEmployeeLogin {
  registration: string;
  password: string;
}
