import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategoryMovieCreate,
  mockedMovieCreate,
  mockedRoomCreate,
  mockedTicketCreate,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/tickets", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user").send(mockedUser);
    await request(app).post("/employee").send(mockedAdmin);

    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    await request(app)
      .post("/categories/movies")
      .send(mockedCategoryMovieCreate)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const categoryMovieResponse = await request(app).get("/categories/movies");
    const categoryMovie_id = categoryMovieResponse.body.id;
    mockedMovieCreate.categoryMovie_id = categoryMovie_id;

    await request(app)
      .post("/movies")
      .send(mockedMovieCreate)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const movieResponse = await request(app).get("/movies");
    const movie_Id = movieResponse.body.id;
    mockedRoomCreate.movie_id = movie_Id;

    await request(app)
      .post("/rooms")
      .send(mockedRoomCreate)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /tickets -  Must be able to create a product", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const roomResponse = await request(app).get("/rooms");
    const room_Id = roomResponse.body.id;
    mockedTicketCreate.room_id = room_Id;

    const movieResponse = await request(app).get("/movies");
    const movie_Id = movieResponse.body.id;
    mockedTicketCreate.movie_id = movie_Id;
    console.log(movie_Id);

    const response = await request(app)
      .post("/tickets")
      .send(mockedTicketCreate)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    console.log(response.body);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("movie");
    expect(response.body).toHaveProperty("room");
    expect(response.body.movie).toHaveProperty("id");
    expect(response.body.movie).toHaveProperty("name");
    expect(response.body.movie).toHaveProperty("director");
    expect(response.body.movie).toHaveProperty("synopsis");
    expect(response.body.movie).toHaveProperty("release_date");
    expect(response.body.room).toHaveProperty("id");
    expect(response.body.room).toHaveProperty("name");
    expect(response.body.room).toHaveProperty("is3D");
    expect(response.body.room).toHaveProperty("seats");
    expect(response.body.movie.name).toEqual("Harry Potter");
    expect(response.body.room.is3D).toEqual(true);
    expect(response.status).toBe(201);
  });
});
