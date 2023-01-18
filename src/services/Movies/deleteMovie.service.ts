import AppDataSource from "../../data-source";
import { Movie } from "../../entities/moviesEntity";
import { AppError } from "../../error";

export async function deleteMovieService(id: string) {
  const movieRepository = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOneBy({ id: id });

  if (!findMovie) {
    throw new AppError("This movie does not exist", 404);
  }

  findMovie.in_theaters = false;

  await movieRepository.save(findMovie);

  return;
}
