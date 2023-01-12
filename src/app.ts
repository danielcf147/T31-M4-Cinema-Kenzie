import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { roomRoute } from "./routes/room/room.routes";

const app = express();

app.use(express.json());




app.use('/rooms', roomRoute)

export default app;
