import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategoryProductCreate,
  mockedCategoryProductCreate2,
  mockedCategoryProductCreate3,
  mockedEmployee,
  mockedEmployeeLogin,
} from "../../mocks";

describe("/categories/movies", () => {
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

  test("POST /categories/products -  Must be able to create a product category", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Beverage");
    expect(response.status).toBe(201);
  });

  test("POST /categories/products -  Should not be able to create a product category without authentication", async () => {
    const response = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /categories/products -  Should not be able to create a product category without being adm", async () => {
    await request(app).post("/employee").send(mockedEmployee);

    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);

    const response = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate3)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /categories/products -  Should not be able to create a product category that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /categories/products -  should  be able to list all categories", async () => {
    const response = await request(app).get("/categories/products");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0].name).toEqual("Beverage");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /categories/products/:id -  should  be able to list category by ID", async () => {
    const getMovieCategory = await request(app).get("/categories/products");
    const getMovieCategoryId = getMovieCategory.body[0].id;

    const getMovieCategoryById = await request(app).get(
      `/categories/products/${getMovieCategoryId}`
    );

    expect(getMovieCategoryById.body).toHaveProperty("id");
    expect(getMovieCategoryById.body).toHaveProperty("name");
    expect(getMovieCategoryById.body.name).toEqual("Beverage");

    expect(getMovieCategoryById.status).toBe(200);
  });
});
