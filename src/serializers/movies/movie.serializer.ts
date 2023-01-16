import * as yup from "yup";
import { SchemaOf } from "yup";
import { MovieRegisters } from "../../interfaces/movie/movies.Interfaces";

const movieCreateSerializer: SchemaOf<MovieRegisters> = yup.object().shape({
  name: yup.string().required(),
  director: yup.string().required(),
  synopsis: yup.string().required(),
  release_date: yup.string().required(),
  categoryMovie_id: yup.string().required(),
});

export { movieCreateSerializer };
