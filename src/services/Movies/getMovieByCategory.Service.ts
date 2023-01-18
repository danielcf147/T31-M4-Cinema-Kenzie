import AppDataSource from "../../data-source";
import { Movie } from "../../entities/moviesEntity";
import { IMovie } from "../../interfaces/movie/movies.Interfaces";

export function getMovieByCategoryService(id: string): Promise<IMovie[]> {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movieQueryBuilder = movieRepository.createQueryBuilder("movie");

  const movies = movieQueryBuilder.where("movie.categoryMovieId = :id", {
    id: id,
  });
  return movies.getMany();
}
