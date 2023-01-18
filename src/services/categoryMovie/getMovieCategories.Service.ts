import AppDataSource from "../../data-source";
import { CategoryMovie } from "../../entities/categoryMoviesEntity";

export async function getMovieCategoriesService(): Promise<CategoryMovie[]> {
    const categoryMovieRepository = AppDataSource.getRepository(CategoryMovie)

    const categories = categoryMovieRepository.find()

    return categories;
}
