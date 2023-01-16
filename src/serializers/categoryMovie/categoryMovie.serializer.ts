import * as yup from "yup";
import { SchemaOf } from "yup";
import { CategoryMovieCreate } from "../../interfaces/category/categoryMovie.Interface";

const categoryMovieCreateSerializer: SchemaOf<CategoryMovieCreate> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

export { categoryMovieCreateSerializer };
