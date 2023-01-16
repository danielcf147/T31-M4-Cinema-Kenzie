import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedCategoryMovieCreate,
  mockedMovieCreate,
  mockedAdmin,
  mockedAdminLogin,
  mockedCategoryMovieCreate2,
  mockedMovieCreate2,
  mockedCategoryMovieCreate3,
  mockedMovieCreate3,
  mockedEmployee,
  mockedEmployeeLogin,
} from "../../mocks";

describe("/movies", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /movies -  Must be able to create a movie", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/movies")
      .send(mockedCategoryMovieCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryMovie_id = categoryReponse.body.id;
    mockedMovieCreate.categoryMovie_id = categoryMovie_id;

    const response = await request(app)
      .post("/movies")
      .send(mockedMovieCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("synopsis");
    expect(response.body).toHaveProperty("release_date");
    expect(response.body).toHaveProperty("categoryMovie");
    expect(response.body.name).toEqual("Harry Potter");
    expect(response.body.categoryMovie.name).toEqual("fantasy");
    expect(response.status).toBe(201);
  });

  test("POST /movies -  Should not be able to create a movie without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/movies")
      .send(mockedCategoryMovieCreate2)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryMovie_id = categoryReponse.body.id;
    mockedMovieCreate.categoryMovie_id = categoryMovie_id;

    const response = await request(app)
      .post("/movies")
      .send(mockedMovieCreate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /movies -  Should not be able to create a movie without being adm", async () => {
    await request(app).post("/employee").send(mockedEmployee);

    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/movies")
      .send(mockedCategoryMovieCreate3)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryMovie_id = categoryReponse.body.id;
    mockedMovieCreate.categoryMovie_id = categoryMovie_id;

    const response = await request(app)
      .post("/movies")
      .send(mockedMovieCreate3)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /movies -  should not be able to create a movie that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app).get("/categories/movies");

    const categoryMovie_id = categoryReponse.body[0].id;
    mockedMovieCreate.categoryMovie_id = categoryMovie_id;

    const response = await request(app)
      .post("/movies")
      .send(mockedMovieCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /movies -  should  be able to list all movies", async () => {
    const response = await request(app).get("/movies");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("director");
    expect(response.body[0]).toHaveProperty("synopsis");
    expect(response.body[0]).toHaveProperty("release_date");
    expect(response.body[0]).toHaveProperty("categoryMovie");
    expect(response.body[0].name).toEqual("Harry Potter");
    expect(response.body[0].categoryMovie.name).toEqual("fantasy");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /movies/:id -  should  be able to list movie by ID", async () => {
    const getMovie = await request(app).get("/movies");
    const movieId = getMovie.body[0].id;
    const response = await request(app).get(`/movies/${movieId}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("synopsis");
    expect(response.body).toHaveProperty("release_date");
    expect(response.body).toHaveProperty("category");
    expect(response.body.name).toEqual("Harry Potter");
    expect(response.body.category).toEqual("fantasy");
    expect(response.status).toBe(200);
  });

  test("GET /movies -  should  be able to list movie by category ID", async () => {
    const getMovie = await request(app).get("/movies");
    const movieId = getMovie.body[0].categoryMovie.id;
    const response = await request(app).get(`/movies/category/${movieId}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("director");
    expect(response.body[0]).toHaveProperty("synopsis");
    expect(response.body[0]).toHaveProperty("release_date");
    expect(response.body[0].name).toEqual("Harry Potter");
    expect(response.status).toBe(200);
  });
});
