import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedOrderCreate,
  mockedOrderCreate2,
  mockedUser,
  mockedProductCreate,
  mockedCategoryProductCreate,
  mockedUserLogin,
} from "../../mocks";

describe("/order", () => {
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /order -  Must be able to create a order as user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    await request(app)
      .post("/categories/products")
      .send(mockedCategoryProductCreate)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const productCategoryResponse = await request(app).get(
      "/categories/products"
    );
    const productCategoryId = productCategoryResponse.body[0].id;
    mockedProductCreate.categoryFoodId = productCategoryId;

    await request(app)
      .post("/products")
      .send(mockedProductCreate)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const productResponse = await request(app).get("/products");

    const productId = productResponse.body[0].id;
    mockedOrderCreate.food[0].id = productId;

    const response = await request(app)
      .post("/order")
      .send(mockedOrderCreate)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("user");
    expect(response.body.food[0]).toHaveProperty("id");
    expect(response.body.food[0]).toHaveProperty("name");
    expect(response.body.food[0]).toHaveProperty("stock");
    expect(response.body.food[0]).toHaveProperty("price");
    expect(response.body.food[0].stock).toBeGreaterThan(0);
    expect(response.body.food[0].name).toEqual("tic tac");
    expect(response.status).toBe(201);
  });

  test("POST /order -  Must be able to create a order as employee", async () => {
    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const productResponse = await request(app).get("/products");

    const productId = productResponse.body[0].id;
    mockedOrderCreate2.food[0].id = productId;

    const response = await request(app)
      .post("/order")
      .send(mockedOrderCreate2)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("employee");
    expect(response.body.food[0]).toHaveProperty("id");
    expect(response.body.food[0]).toHaveProperty("name");
    expect(response.body.food[0]).toHaveProperty("stock");
    expect(response.body.food[0]).toHaveProperty("price");
    expect(response.body.food[0].stock).toBeGreaterThan(0);
    expect(response.body.food[0].name).toEqual("tic tac");
    expect(response.status).toBe(201);
  });

  test("POST /order -  Should not be able to create a order without authentication", async () => {
    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const productResponse = await request(app).get("/products");

    const productId = productResponse.body[0].id;
    mockedOrderCreate2.food[0].id = productId;

    const response = await request(app).post("/order").send(mockedOrderCreate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /order -  should  be able to list all orders", async () => {
    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .get("/order")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("employee");
    expect(response.body[0]).toHaveProperty("user");
    expect(response.body[0].user).toHaveProperty("id");
    expect(response.body[0].user).toHaveProperty("name");
    expect(response.body[1].employee).toHaveProperty("id");
    expect(response.body[1].employee).toHaveProperty("name");
    expect(response.body[1].employee).toHaveProperty("registration");
    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
  });

  test("GET /order -  Should not be able to list orders without authentication", async () => {
    const response = await request(app).get("/order");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
