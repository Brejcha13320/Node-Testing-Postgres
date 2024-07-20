import { Express } from "express";
import * as http from "http";

import request from "supertest";
import TestAgent from "supertest/lib/agent";

import { Server } from "../src/server";
import { envs } from "../src/config";
import { prisma } from "../src/database";
import { UserWithCategories } from "../src/interfaces";

describe("test for /users path", () => {
  let port = envs.PORT;
  let server: Express;
  let app: http.Server;
  let api: TestAgent;

  beforeAll(async () => {
    server = Server.createServer();
    app = Server.startServer(server, port);
    api = request(app);
  });

  afterAll(() => {
    app.close();
  });

  describe("GET /users", () => {
    let access_token: string;

    beforeAll(async () => {
      await prisma.user.deleteMany();
      //Create User
      const inputDataRegister = {
        name: "Jesus",
        email: "jesus@gmail.com",
        password: "123456",
      };
      await api.post("/api/auth/register").send(inputDataRegister);

      //Login User for Token
      const inputDataLogin = {
        email: "jesus@gmail.com",
        password: "123456",
      };
      const { body } = await api.post("/api/auth/login").send(inputDataLogin);
      access_token = body.access_token;
    });

    test("should return 200", async () => {
      const { statusCode, body } = await api
        .get("/api/users")
        .set({ Authorization: `Bearer ${access_token}` });
      expect(statusCode).toBe(200);
      expect(body.length).toEqual(1);
    });

    test("should return 401 invalid bearer token", async () => {
      const { statusCode } = await api
        .get("/api/users")
        .set({ Authorization: `Bearerrr ${access_token}` });
      expect(statusCode).toBe(401);
    });

    test("should return 401 invalid token", async () => {
      const { statusCode } = await api
        .get("/api/users")
        .set({ Authorization: `Bearer 123` });
      expect(statusCode).toBe(401);
    });

    test("should return 401 without token", async () => {
      const { statusCode } = await api.get("/api/users");
      expect(statusCode).toBe(401);
    });
  });

  describe("GET /users/categories", () => {
    let access_token: string;

    beforeAll(async () => {
      await prisma.user.deleteMany();
      //Create User
      const inputDataRegister = {
        name: "Jesus",
        email: "jesus@gmail.com",
        password: "123456",
      };
      const { body } = await api
        .post("/api/auth/register")
        .send(inputDataRegister);

      //Create Category
      await prisma.category.create({
        data: {
          userId: body.id,
          name: "Category 1",
        },
      });

      //Login User for Token
      const inputDataLogin = {
        email: "jesus@gmail.com",
        password: "123456",
      };
      const response = await api.post("/api/auth/login").send(inputDataLogin);
      access_token = response.body.access_token;
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    test("should return 200", async () => {
      const { statusCode, body } = await api
        .get("/api/users/categories")
        .set({ Authorization: `Bearer ${access_token}` });
      expect(statusCode).toBe(200);
      expect(body.length).toEqual(1);
      expect(body[0]).toHaveProperty("categories");
    });

    test("should return 200 and not have a password property", async () => {
      const { statusCode, body } = await api
        .get("/api/users/categories")
        .set({ Authorization: `Bearer ${access_token}` });
      expect(statusCode).toBe(200);
      body.forEach((user: UserWithCategories) => {
        expect(user).not.toHaveProperty("password");
      });
    });

    test("should return 401 invalid bearer token", async () => {
      const { statusCode } = await api
        .get("/api/users")
        .set({ Authorization: `Bearerrr ${access_token}` });
      expect(statusCode).toBe(401);
    });

    test("should return 401 invalid token", async () => {
      const { statusCode } = await api
        .get("/api/users")
        .set({ Authorization: `Bearer 123` });
      expect(statusCode).toBe(401);
    });

    test("should return 401 without token", async () => {
      const { statusCode } = await api.get("/api/users");
      expect(statusCode).toBe(401);
    });
  });
});
