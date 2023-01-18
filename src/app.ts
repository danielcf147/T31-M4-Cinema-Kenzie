import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { roomRoute } from "./routes/room/room.routes";
import { handleError } from "./error";
import { moviesRouters } from "./routes/Movies/movies.Routes";
import { categoryMovieRouters } from "./routes/CategoryMovies/categoryMovies.Routes";
import employeeRouter from "./routes/Employee/employee.routes";

import { productsRouters } from "./routes/Products/products.Routes";
import { categoryProductsRoutes } from "./routes/CategoryProducts/categoryProducts.Routes";
import userRoutes from "./routes/user/user.routes";
import sessionRoute from "./routes/session/createUserSession.routes";
import { orderRoutes } from "./routes/orders/orders.routes";
import { ticketRoute } from "./routes/tickets/tickets.routes";


const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", sessionRoute);
app.use("/employee", employeeRouter);
app.use("/rooms", roomRoute);
app.use("/movies", moviesRouters);
app.use("/categories/movies", categoryMovieRouters);
app.use("/products", productsRouters)
app.use("/categories/products", categoryProductsRoutes)
app.use("/order", orderRoutes)
app.use("/tickets", ticketRoute)

app.use(handleError);

export default app;
