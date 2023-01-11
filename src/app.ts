import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { moviesRouters } from "./routes/Movies/movies.Routes";
import { categoryMovieRouters } from "./routes/CategoryMovies/categoryMovies.Routes";

const app = express();

app.use(express.json());

app.use('/movies', moviesRouters)
app.use('/categories/movies', categoryMovieRouters)

export default app;
