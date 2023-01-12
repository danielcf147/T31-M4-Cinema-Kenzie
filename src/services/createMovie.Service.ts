import AppDataSource from "../data-source";
import { Movie } from "../entities/moviesEntity";
import { AppError } from "../error";
import { Movie as IMovie, MovieRegisters } from "../interfaces/movie/movies.Interfaces";

export async function createMoviesService(movie: MovieRegisters) {
    const movieRepository = AppDataSource.getRepository(Movie)

    const exist = await movieRepository.findOneBy({ name: movie.name })

    if (exist) {
        throw new AppError('An error has occurred: a film with that name is already registered.', 409)
    }

    const newMovie = movieRepository.create(movie)

    await movieRepository.save(newMovie)

    return newMovie;
}