import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedOrderCreate, mockedUser, mockedUserLogin } from "../../mocks";

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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /order-  Must be able to create a order", async () => {
    await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedUserLogin);

    const userId = userLoginResponse.body.id;
    mockedOrderCreate.user = userId;

    const response = await request(app)
      .post("/order")
      .send(mockedOrderCreate)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("food");
    expect(response.body.food[0]).toHaveProperty("name");
    expect(response.body.food[0]).toHaveProperty("stock");
    expect(response.body.food[0]).toHaveProperty("price");
    expect(response.body).toHaveProperty("categoryFood");
    expect(response.body.name).toEqual("tic tac");
    expect(response.status).toBe(201);
  });
});
