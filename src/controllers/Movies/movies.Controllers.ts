import { Request, Response } from "express";
import { MovieRegisters } from "../../interfaces/movie/movies.Interfaces";

import { createMoviesService } from "../../services/movies/createMovie.Service";
import { getAllMoviesService } from "../../services/movies/getAllMovies.Service";
import { getMovieByCategoryService } from "../../services/movies/getMovieByCategory.Service";
import { getMovieByIdService } from "../../services/movies/getMovieById.Service";
import { deleteMovieService } from "../../services/Movies/deleteMovie.service";

export async function createMovieController(req: Request, res: Response) {
  const movie: MovieRegisters = req.body;

  const newMovie = await createMoviesService(movie);

  return res.status(201).json(newMovie);
}

export async function getAllMoviesController(req: Request, res: Response) {
  const movies = await getAllMoviesService();

  return res.status(200).json(movies);
}

export async function getMovieByCategoryController(
  req: Request,
  res: Response
) {
  const categoryId = req.params.categoryId;

  const movies = await getMovieByCategoryService(categoryId);

  return res.status(200).json(movies);
}

export async function getMovieByIdController(req: Request, res: Response) {
  const movieId = req.params.movieId;

  const movie = await getMovieByIdService(movieId);

  return res.status(200).json(movie);
}

export async function deleteMovieController(req: Request, res: Response) {
  const movieId = req.params.movieId;

  const movieToBeDeleted = await deleteMovieService(movieId);

  return res.status(204).json(movieToBeDeleted);
}
