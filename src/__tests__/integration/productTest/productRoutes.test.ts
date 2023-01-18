import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedCategoryProductCreate,
  mockedCategoryProductCreate2,
  mockedCategoryProductCreate3,
  mockedProductCreate,
  mockedProductCreate2,
  mockedProductCreate3,
  mockedAdmin,
  mockedAdminLogin,
  mockedEmployee,
  mockedEmployeeLogin,
  mockedUser2,
  mockedUserLogin2,
} from "../../mocks";

describe("/products", () => {
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

  test("POST /products -  Must be able to create a product", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryFood_Id = categoryReponse.body.id;
    mockedProductCreate.categoryFoodId = categoryFood_Id;

    const response = await request(app)
      .post("/products")
      .send(mockedProductCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("stock");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("categoryFood");
    expect(response.body.name).toEqual("tic tac");
    expect(response.status).toBe(201);
  });

  test("POST /products -  Should not be able to create a product without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate2)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryFood_Id = categoryReponse.body.id;
    mockedProductCreate2.categoryFoodId = categoryFood_Id;

    const response = await request(app)
      .post("/products")
      .send(mockedProductCreate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /products -  Should not be able to create a product without being adm", async () => {
    await request(app).post("/employee").send(mockedEmployee);

    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate3)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const categoryFood_Id = categoryReponse.body.id;
    mockedProductCreate3.categoryFoodId = categoryFood_Id;

    const response = await request(app)
      .post("/products")
      .send(mockedProductCreate3)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /products -  should not be able to create a product that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const categoryReponse = await request(app).get("/categories/products");

    const categoryFood_Id = categoryReponse.body[0].id;
    mockedProductCreate.categoryFoodId = categoryFood_Id;

    const response = await request(app)
      .post("/products")
      .send(mockedProductCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /products -  should  be able to list all products", async () => {
    const response = await request(app).get("/products");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("stock");
    expect(response.body[0]).toHaveProperty("categoryFood");
    expect(response.body[0].name).toEqual("tic tac");
    expect(response.body[0].categoryFood.name).toEqual("Beverage");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET products/:id -  should  be able to list products by ID", async () => {
    const getProduct = await request(app).get("/products");
    const productId = getProduct.body[0].id;
    const response = await request(app).get(`/products/${productId}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("stock");
    expect(response.body).toHaveProperty("category");
    expect(response.body.name).toEqual("tic tac");
    expect(response.body.category).toEqual("Beverage");
    expect(response.status).toBe(200);
  });

  test("GET /movies -  should  be able to list movie by ID", async () => {
    const getProduct = await request(app).get("/products");
    const productId = getProduct.body[0].categoryFood.id;
    const response = await request(app).get(`/products/category/${productId}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("stock");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0].name).toEqual("tic tac");
    expect(response.status).toBe(200);
  });

  test("PATCH /products/:id -  should not be able to update product without authentication", async () => {
    const newValues = { price: 6, stock: 99 };

    const getProduct = await request(app).get("/products");
    const productId = getProduct.body[0].id;

    const response = await request(app)
      .patch(`/products/${productId}`)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /products/:id - should not be able to update product with invalid id", async () => {
    const newValues = { price: 6, stock: 99 };

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .patch(`/products/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${admingLoginResponse.body.token}`)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /products/:id - should not be able to update without being adm or employee", async () => {
    const newValues = { price: 15 };

    await request(app).post("/user").send(mockedUser2);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin2);

    const productTobeUpdateRequest = await request(app).get("/products");

    const productTobeUpdateId = productTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/products/${productTobeUpdateId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /products/:id -  should be able to update a product", async () => {
    const newValues = { price: 6, stock: 99 };

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const productTobeUpdateRequest = await request(app).get("/products");

    const productTobeUpdateId = productTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/products/${productTobeUpdateId}`)
      .set("Authorization", `Bearer ${admingLoginResponse.body.token}`)
      .send(newValues);

    const productUpdated = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${admingLoginResponse.body.token}`);

    expect(productUpdated.body[0].stock).toEqual(99);
    expect(productUpdated.body[0].price).toEqual(6);
    expect(response.status).toBe(200);
  });

  test("DELETE /products/:id -  should not be able to delete product without authentication", async () => {
    const productTobeUpdateRequest = await request(app).get("/products");

    const productTobeUpdateId = productTobeUpdateRequest.body[0].id;

    const response = await request(app).delete(
      `/products/${productTobeUpdateId}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /products/:id -  should not be able to delete product without not being admin", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);

    const productTobeUpdateRequest = await request(app).get("/products");

    const productTobeUpdateId = productTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .delete(`/products/${productTobeUpdateId}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /products/:id -  Must be able to delete product", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    await request(app)
      .post("/products")
      .send(mockedProductCreate2)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const productTobeDeletedRequest = await request(app).get("/products");

    const productTobeDeletedId = productTobeDeletedRequest.body[0].id;

    const response = await request(app)
      .delete(`/products/${productTobeDeletedId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const findProduct = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(findProduct.body).toHaveLength(1);
    expect(response.status).toBe(204);
  });
});
