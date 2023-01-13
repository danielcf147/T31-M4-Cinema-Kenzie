import * as yup from "yup";
import { SchemaOf } from "yup";
import { IEmployeeLogin } from "../../interfaces/user/empoyee.Interface";

const employerLoginSerializer: SchemaOf<IEmployeeLogin> = yup.object().shape({
  registration: yup.string().required(),
  password: yup.string().required(),
});

export default employerLoginSerializer;
