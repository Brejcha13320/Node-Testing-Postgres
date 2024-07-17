import { envs } from "../src/config";
import { Server } from "../src/server";

jest.mock("../src/server");

describe("test app.ts", () => {
  test("should createServer and startServer with arguments", async () => {
    const port = envs.PORT;
    const routes = expect.any(Function);
    await import("../src/app");
    expect(Server.createServer).toHaveBeenCalledTimes(1);
    expect(Server.startServer).toHaveBeenCalledTimes(1);
    expect(Server.startServer).toHaveBeenCalledWith(undefined, port);
  });
});
