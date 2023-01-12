import AppDataSource from "../../data-source";
import { Movie } from "../../entities/moviesEntity";

export async function getAllMoviesService(): Promise<Movie[]> {
    const moviesRepository = AppDataSource.getRepository(Movie)

    const movies = moviesRepository.find({
        relations: {
            categoryMovie: true
        }
    });

    return movies;
}