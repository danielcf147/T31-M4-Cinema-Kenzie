import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedAdminLogin,
  mockedAdmin,
} from "../../mocks";

describe("/user", () => {
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

  test("POST /user -  Must be able to create a user", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Joana");
    expect(response.body.email).toEqual("joana@mail.com");
    expect(response.status).toBe(201);
  });

  test("POST /user -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /user -  Must be able to list users", async () => {
    await request(app).post("/user").send(mockedUser);
    await request(app).post("/employee").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    console.log(adminLoginResponse.body.token);
    console.log(response.body);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
  });
});
