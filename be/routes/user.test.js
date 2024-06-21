import request from "supertest";
import app from "../index.js";

describe("POST /api/v1/users/register", () => {
  const requestBody = {
    username: "Romeo",
    email: "romeo@email.com",
    password: "1234",
  };

  test("It should respond with 201 and json", async () => {
    await request(app)
      .post("/api/v1/users/register")
      .send(requestBody)
      .expect(201)
      .expect("Content-Type", /json/);
  });

  const existingUser = {
    username: "Ellen",
    email: "ellen@email.com",
    password: "1234",
  };

  test("It should respond with 400 and 'Email already exists.'", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(existingUser)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Email already exists.");
  });
});

describe("POST /api/v1/users/login", () => {
  const userCredentials = {
    email: "ellen@email.com",
    password: "1234",
  };

  test("It should respond with 200 and json", async () => {
    await request(app)
      .post("/api/v1/users/login")
      .send(userCredentials)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  const incorrectPassword = {
    email: "ellen@email.com",
    password: "abcd",
  };

  test("It should respond with 400 and 'Password did not match.'", async () => {
    const response = await request(app)
      .post("/api/v1/users/login")
      .send(incorrectPassword)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe("Password didn't match.");
  });
});
