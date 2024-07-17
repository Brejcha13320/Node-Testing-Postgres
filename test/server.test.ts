import { envs } from "../src/config";
import { Server } from "../src/server";
import { Router } from "express";
import express from "express";

describe("test server.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createServer should return a new express server", () => {
    const spyCreateServer = jest.spyOn(Server, "createServer");
    const server = Server.createServer();

    expect(server instanceof Function).toBeTruthy();
    expect(spyCreateServer).toHaveBeenCalledTimes(1);
  });

  test("startServer should start server", () => {
    const mockServer = express();
    const spyStartServer = jest.spyOn(Server, "startServer");
    const spyListen = jest.spyOn(mockServer, "listen");

    const server = Server.startServer(mockServer, envs.PORT);

    expect(spyStartServer).toHaveBeenCalledTimes(1);
    expect(spyStartServer).toHaveBeenCalledWith(mockServer, envs.PORT);
    expect(spyListen).toHaveBeenCalledTimes(1);
    expect(spyListen).toHaveBeenCalledWith(envs.PORT, expect.any(Function));
    server.close();
  });
});
