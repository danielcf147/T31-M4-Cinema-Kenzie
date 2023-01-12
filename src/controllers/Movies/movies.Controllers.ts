import { Request, Response } from "express";
import { MovieRegisters } from "../../interfaces/movie/movies.Interfaces";
import { createMoviesService } from "../../services/createMovie.Service";

export async function createMovieController(req: Request, res: Response) {
    const movie: MovieRegisters = req.body

    const newMovie = await createMoviesService(movie)

    return res.status(201).json(newMovie);
}