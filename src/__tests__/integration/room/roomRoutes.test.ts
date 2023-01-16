import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedRoomCreate,
  mockedRoomCreate2,
  mockedRoomCreate3,
  mockedUser,
  mockedUser2,
  mockedUserLogin,
  mockedUserLogin2,
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

  test("POST /rooms -  Must be able to create a room", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/rooms")
      .send(mockedRoomCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("is3D");
    expect(response.body).toHaveProperty("seats");
    expect(response.body.name).toEqual("1");
    expect(response.status).toBe(201);
  });

  test("POST /rooms -  Should not be able to create a room without authentication", async () => {
    const response = await request(app).post("/rooms").send(mockedRoomCreate2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /rooms -  Should not be able to create a room without being adm or employee", async () => {
    await request(app).post("/employee").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/rooms")
      .send(mockedRoomCreate3)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /rooms -  should not be able to create a room that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/rooms")
      .send(mockedRoomCreate)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /room -  should  be able to list all rooms", async () => {
    const response = await request(app).get("/rooms");

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("is3D");
    expect(response.body[0]).toHaveProperty("seats");
    expect(response.body[0].name).toEqual("1");
    expect(response.body).toHaveLength(3);
    expect(response.status).toBe(200);
  });

  test("PATCH /room/:id -  should not be able to update room without authentication", async () => {
    const newValues = { is3D: false, seats: 99 };

    const getRoom = await request(app).get("/rooms");
    const roomId = getRoom.body[0].id;

    const response = await request(app)
      .patch(`/rooms/${roomId}`)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /room/:id -  should not be able to update room with invalid ID", async () => {
    const newValues = { is3D: false, seats: 99 };

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .patch(`/rooms/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .send(newValues)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /room/:id -  should not be able to update room without being adm or employee", async () => {
    const newValues = { is3D: false, seats: 99 };

    await request(app).post("/user").send(mockedUser2);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin2);

    const getRoom = await request(app).get("/rooms");
    const roomId = getRoom.body[0].id;

    const response = await request(app)
      .patch(`/rooms/${roomId}`)
      .send(newValues)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /room/:id -  should be able to update room", async () => {
    const newValues = { is3D: false, seats: 99 };

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const getRoom = await request(app).get("/rooms");
    const roomId = getRoom.body[0].id;

    const response = await request(app)
      .patch(`/rooms/${roomId}`)
      .send(newValues)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const productUpdated = await request(app)
      .get("/rooms")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(productUpdated.body[0].is3D).toEqual(false);
    expect(productUpdated.body[0].seats).toEqual(99);
    expect(response.status).toBe(200);
  });
});
