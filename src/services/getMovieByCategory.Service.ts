import AppDataSource from "../data-source";
import { Movie } from "../entities/moviesEntity";

export function getMovieByCategoryService(id: string) {

    const movieRepository = AppDataSource.getRepository(Movie)

    const movieQueryBuilder = movieRepository.createQueryBuilder("movie")

    const movies = movieQueryBuilder.where("movie.categoryMovieId = :id", { id: id })

    return movies.getMany()

}