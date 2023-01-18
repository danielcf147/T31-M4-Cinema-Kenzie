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

  test("POST /order-  Must be able to create a order as user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const userResponse = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const userId = userResponse.body[0].id;
    mockedOrderCreate.user = userId;

    const response = await request(app)
      .post("/order")
      .send(mockedOrderCreate)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("user");
    expect(response.body.food[0]).toHaveProperty("name");
    expect(response.body.food[0]).toHaveProperty("stock");
    expect(response.body.food[0]).toHaveProperty("price");
    expect(response.body.food[0].name).toEqual("pipoca");
    expect(response.status).toBe(201);
  });

  test("POST /order-  Must be able to create a order as employee", async () => {
    const admLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const employeeResponse = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    const employeeId = employeeResponse.body[0].id;
    mockedOrderCreate2.employee = employeeId;

    const response = await request(app)
      .post("/order")
      .send(mockedOrderCreate2)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("employee");
    expect(response.body.food[0]).toHaveProperty("name");
    expect(response.body.food[0]).toHaveProperty("stock");
    expect(response.body.food[0]).toHaveProperty("price");
    expect(response.body.food[0].name).toEqual("pipoca");
    expect(response.status).toBe(201);
  });
});
