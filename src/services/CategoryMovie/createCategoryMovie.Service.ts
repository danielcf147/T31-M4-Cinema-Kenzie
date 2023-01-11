import AppDataSource from "../../data-source";
import { CategoryMovie } from "../../entities/categoryMoviesEntity";
import { AppError } from "../../error";
import { CategoryMovieCreate } from "../../interfaces/category/categoryMovie.Interface";

export async function createCategoryMovieService(category: CategoryMovieCreate): Promise<CategoryMovie> {
    const movieCategoryRepository = AppDataSource.getRepository(CategoryMovie)

    const exist = await movieCategoryRepository.findOneBy({ name: category.name })

    if (exist) {
        throw new AppError('An error has occurred: a category with that name is already registered', 409)
    }

    const newCategory = movieCategoryRepository.create(category)

    await movieCategoryRepository.save(newCategory)

    return newCategory;

}