import AppDataSource from "../../data-source";
import { CategoryMovie } from "../../entities/categoryMoviesEntity";
import { Movie } from "../../entities/moviesEntity";
import { AppError } from "../../error";
import {
  IMovie,
  MovieRegisters,
} from "../../interfaces/movie/movies.Interfaces";

export async function createMoviesService(
  movie: MovieRegisters
): Promise<IMovie> {
  console.log(movie);
  const movieRepository = AppDataSource.getRepository(Movie);
  const movieCategoryRepository = AppDataSource.getRepository(CategoryMovie);

  const validCategory = await movieCategoryRepository.findOneBy({
    id: movie.categoryMovie_id,
  });

  if (!validCategory) {
    throw new AppError(
      "An error has occurred: a film category don't registered registered.",
      404
    );
  }

  const exist = await movieRepository.findOneBy({ name: movie.name });

  if (exist) {
    throw new AppError(
      "An error has occurred: a film with that name is already registered.",
      409
    );
  }
  const dataMovie: IMovie = {
    name: movie.name,
    categoryMovie: validCategory,
    director: movie.director,
    release_date: movie.release_date,
    synopsis: movie.synopsis,
  };

  const newMovie = movieRepository.create(dataMovie);

  await movieRepository.save(newMovie);

  return newMovie;
}
