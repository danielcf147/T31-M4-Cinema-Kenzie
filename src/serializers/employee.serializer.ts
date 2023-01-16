import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  Employee as IEmployee,
  EmployeeRegister as IEmployeeRegister,
  EmployeeUpdate as IEmployeeUpdate,
} from "../interfaces/user/empoyee.Interface";

const employeeSerializer: SchemaOf<IEmployeeRegister> = yup.object().shape({
  name: yup.string().required(),
  registration: yup.string().required(),
  age: yup.number().required(),
  isAdm: yup.boolean().required(),
  password: yup.string().required(),
});

const employeeWithoutPasswordSerializer: SchemaOf<IEmployee> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    registration: yup.string().notRequired(),
    age: yup.number().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

const employeeUpdate: SchemaOf<IEmployeeUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  registration: yup.string().notRequired(),
  age: yup.number().notRequired(),
  isAdm: yup.boolean().notRequired(),
  password: yup.string().notRequired(),
  id: yup.string().notRequired(),
  isActive: yup.boolean().notRequired(),
});

export {
  employeeSerializer,
  employeeWithoutPasswordSerializer,
  employeeUpdate,
};
