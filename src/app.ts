import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { roomRoute } from "./routes/room/room.routes";
import { handleError } from "./error";
import { moviesRouters } from "./routes/Movies/movies.Routes";
import { categoryMovieRouters } from "./routes/CategoryMovies/categoryMovies.Routes";


const app = express();

app.use(express.json());





app.use('/rooms', roomRoute)
app.use("/movies", moviesRouters);
app.use("/categories/movies", categoryMovieRouters);

app.use(handleError);


export default app;
