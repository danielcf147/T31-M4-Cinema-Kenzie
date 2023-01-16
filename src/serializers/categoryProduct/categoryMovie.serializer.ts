import * as yup from "yup";
import { SchemaOf } from "yup";
import { CategoryProductCreate } from "../../interfaces/category/categoryFood.interface";

const categoryProductCreateSerializer: SchemaOf<CategoryProductCreate> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

export { categoryProductCreateSerializer };
