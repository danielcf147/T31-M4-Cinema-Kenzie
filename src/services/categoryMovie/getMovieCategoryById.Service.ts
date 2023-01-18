import AppDataSource from "../../data-source";
import { CategoryMovie } from "../../entities/categoryMoviesEntity";

export async function getMovieCategoryByIdService(
  id: string
): Promise<CategoryMovie> {
  const categoryRepository = AppDataSource.getRepository(CategoryMovie);

  const categoryQueryBuilder =
    categoryRepository.createQueryBuilder("category");

  const category = await categoryQueryBuilder
    .leftJoinAndSelect("category.movies", "movie")
    .where("category.id = :id", { id: id })
    .getOne();

  const data = {
    id: category.id,
    name: category.name,
    movies: category.movies,
  };

  return data;
}
