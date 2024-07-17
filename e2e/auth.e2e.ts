import { Express } from "express";
import * as http from "http";

import request from "supertest";
import TestAgent from "supertest/lib/agent";

import { Server } from "../src/server";
import { BcryptAdapter, envs } from "../src/config";
import { prisma } from "../src/database";

describe("test for /auth path", () => {
  let port = envs.PORT;
  let server: Express;
  let app: http.Server;
  let api: TestAgent;

  beforeAll(() => {
    server = Server.createServer();
    app = Server.startServer(server, port);
    api = request(app);
  });

  afterAll(() => {
    app.close();
  });

  describe("GET /auth/register", () => {
    beforeEach(async () => {
      await prisma.user.deleteMany();
    });

    test("should return 201 with user was created", async () => {
      const inputData = {
        name: "Jesus",
        email: "jesus@gmail.com",
        password: "123456",
      };
      const { statusCode, body } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(201);
      expect(body).toEqual({
        id: expect.any(String),
        name: inputData.name,
        email: inputData.email,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test("should return 400 for email already exists", async () => {
      const inputData = {
        name: "Jesus",
        email: "jesus@gmail.com",
        password: "123456",
      };
      const createUser = {
        name: "Jesus",
        email: "jesus@gmail.com",
        password: BcryptAdapter.hash("123456"),
      };
      await prisma.user.create({
        data: createUser,
      });
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });

    test("should return 400 without name", async () => {
      const inputData = {
        email: "jesus@gmail.com",
        password: "123456",
      };
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });
    test("should return 400 without email", async () => {
      const inputData = {
        name: "jesus",
        password: "123456",
      };
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });
    test("should return 400 without password", async () => {
      const inputData = {
        name: "jesus",
        email: "jesus@gmail.com",
      };
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });
    test("should return 400 for short password", async () => {
      const inputData = {
        name: "jesus",
        email: "jesus@gmail.com",
        password: "123",
      };
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });
    test("should return 400 for email not valid", async () => {
      const inputData = {
        name: "jesus",
        email: "jesus@gmail",
        password: "123",
      };
      const { statusCode } = await api
        .post("/api/auth/register")
        .send(inputData);
      expect(statusCode).toBe(400);
    });
  });
});
