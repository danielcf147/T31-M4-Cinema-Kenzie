import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedEmployee,
  mockedEmployeeLogin,
  mockedAdmin,
  mockedAdminLogin,
  mockedEmployee2,
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

  test("POST /employee -  Must be able to create a employee", async () => {
    const response = await request(app).post("/employee").send(mockedEmployee);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("registration");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Pedro");
    expect(response.body.registration).toEqual("2");
    expect(response.status).toBe(201);
  });

  test("POST /employee -  should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/employee").send(mockedEmployee);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /employee -  Must be able to list employee", async () => {
    await request(app).post("/employee").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /employee -  should not be able to list employee without authentication", async () => {
    const response = await request(app).get("/employee");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /employee -  should not be able to list employee not being admin", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);
    const response = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /employee/:id -  should not be able to delete employee without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeTobeDeleted = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/employee/${employeeTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /employee/:id -  should not be able to delete employee not being admin", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeTobeDeleted = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/employee/${employeeTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /user/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeTobeDeleted = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/employee/${employeeTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findEmployee = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findEmployee.body[0].isActive).toBe(false);
  });

  test("DELETE /user/:id -  shouldn't be able to delete user with isActive = false", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeTobeDeleted = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/employee/${employeeTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /employee/:id -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/employee").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/employee/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /employee/:id -  should not be able to update user without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeTobeUpdate = await request(app)
      .get("/employee")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/employee/${employeeTobeUpdate.body[0].id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /employee/:id - should not be able to update user with invalid id", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/employee/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /employee/:id - should not be able to update id field value", async () => {
    const newValues = { id: false };

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const employeeTobeUpdateRequest = await request(app)
      .get("/employee")
      .set("Authorization", token);
    const userTobeUpdateId = employeeTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/employee/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id - should not be able to update another user without adm permission", async () => {
    await request(app).post("/user").send(mockedEmployee2);

    const newValues = { isActive: false };

    const employeeLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedEmployeeLogin);

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const employeeToken = `Bearer ${employeeLoginResponse.body.token}`;
    const adminToken = `Bearer ${admingLoginResponse.body.token}`;

    const employeeTobeUpdateRequest = await request(app)
      .get("/employee")
      .set("Authorization", adminToken);
    const employeeTobeUpdateId = employeeTobeUpdateRequest.body[1].id;

    const response = await request(app)
      .patch(`/employee/${employeeTobeUpdateId}`)
      .set("Authorization", employeeToken)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id -  should be able to update user", async () => {
    const newValues = { name: "Joana Brito", password: "456789" };

    const admingLoginResponse = await request(app)
      .post("/login/employer")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const employeeTobeUpdateRequest = await request(app)
      .get("/employee")
      .set("Authorization", token);
    const employeeTobeUpdateId = employeeTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/employee/${employeeTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const employeeUpdated = await request(app)
      .get("/employee")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(employeeUpdated.body[0].name).toEqual("Joana Brito");
    expect(employeeUpdated.body[0]).not.toHaveProperty("password");
  });
});
