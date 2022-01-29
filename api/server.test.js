// Write your tests here
const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).not.toBe(false);
});

test("correct environment variable", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("server.js", () => {
  describe("catch all unknown route", () => {
    test("should return 404 status code", async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatusCode);
    }, 600);

    test("should return a custom error JSON object", async () => {
      const expectedBody = { message: "Resource not found" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    }, 600);
  });

  describe("[POST] /api/auth/register", () => {
    describe("when the username or password is missing", () => {
      test("should respond with a status code of 422", async () => {
        const bodyPayload = [
          { username: "username" },
          { password: "password" },
          {},
        ];

        for (const body of bodyPayload) {
          const response = await request(server)
            .post("/api/auth/register")
            .send(body);
          expect(response.status).toBe(422);
        }
      }, 600);

      test("should return the proper JSON object", async () => {
        const expectedBody = { message: "username and password required" };

        const response = await request(server).post("/api/auth/register");

        expect(response.body).toEqual(expectedBody);
      }, 600);
    });

    describe("when given username and password", () => {
      test("responds with proper status on success", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send({ username: "shanae", password: "1212" });
        console.log(response.status);
        expect(response.status).toBe(201);
      }, 600);

      test("saves the user with a bcrypted password instead of plain text", async () => {
        await request(server)
          .post("/api/auth/register")
          .send({ username: "shanae", password: "1212" });
        const shanae = await db("users").where("username", "shanae").first();
        expect(bcrypt.compareSync("1212", shanae.password)).toBeTruthy();
      }, 600);
    });
  });

  describe("[POST] /api/auth/login", () => {
    test("responds with the correct message on valid credentials", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "shanae", password: "1212" });
      expect(response.body.message).toMatch("welcome, shanae");
    }, 600);

    test("responds with the correct status and message on invalid credentials", async () => {
      let response = await request(server)
        .post("/api/auth/login")
        .send({ username: "shanael", password: "1212" });
      expect(response.body.message).toMatch(/invalid credentials/i);
      expect(response.status).toBe(401);
      response = await request(server)
        .post("/api/auth/login")
        .send({ username: "shanae", password: "1212121212" });
      expect(response.body.message).toMatch(/invalid credentials/i);
      expect(response.status).toBe(401);
    }, 600);
  });

  describe("[GET] /api/jokes", () => {
    test("requests without a token are sent away with proper status and message", async () => {
      const response = await request(server).get("/api/jokes");
      expect(response.body.message).toMatch("token required");
    }, 600);
    test("requests with an invalid token are sent away with proper status and message", async () => {
      const response = await request(server)
        .get("/api/jokes")
        .set("Authorization", "nope");
      expect(response.body.message).toMatch("token invalid");
    }, 600);
  });
});
