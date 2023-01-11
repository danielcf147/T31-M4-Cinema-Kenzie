import AppDataSource from "../data-source";
import { Movie } from "../entities/moviesEntity";
import { MovieReturn } from "../interfaces/movie/movies.Interfaces";

export async function getMovieByIdService(movieId: string): Promise<MovieReturn> {

    const movieRepository = AppDataSource.getRepository(Movie)
    const movieQueryBuilder = movieRepository.createQueryBuilder("movie")

    const movie = await movieQueryBuilder
        .leftJoinAndSelect("movie.categoryMovie", "categoryMovie")
        .where("movie.id = :id", { id: movieId })
        .getOne();

    const data = {
        id: movie.id,
        name: movie.name,
        director: movie.director,
        synopsis: movie.synopsis,
        release_date: movie.release_date,
        category: movie.categoryMovie.name
    }

    return data

}