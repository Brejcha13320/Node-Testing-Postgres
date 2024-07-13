import { JwtAdapter, regex, UuidAdapter } from "../../src/config";

describe("test config/regex.ts", () => {
  describe("test regex uuid", () => {
    test("should be a truthy match", () => {
      const uuid = UuidAdapter.v4();
      expect(uuid).toMatch(regex.uuid);
    });
    test("should be a falsy match", () => {
      const uuid = "qwerty12345";
      expect(uuid).not.toMatch(regex.uuid);
    });
  });

  describe("test regex email", () => {
    test("should be a truthy match", () => {
      const email = "admin@mail.com";
      expect(email).toMatch(regex.email);
    });
    test("should be a falsy match", () => {
      const email = "qwerty12345";
      expect(email).not.toMatch(regex.email);
    });
  });

  describe("test regex token", () => {
    test("should be a truthy match", async () => {
      const token = await JwtAdapter.generateToken({ id: "123" });
      expect(token).toMatch(regex.token);
    });
    test("should be a falsy match", () => {
      const token = "qwerty12345";
      expect(token).not.toMatch(regex.token);
    });
  });
});
