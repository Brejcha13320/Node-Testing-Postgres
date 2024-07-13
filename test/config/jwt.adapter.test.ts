import { JwtAdapter, regex } from "../../src/config";

describe("test config/jwt.adapter.ts", () => {
  describe("test JwtAdapter.generateToken", () => {
    let spyGenerateToken: jest.SpyInstance;

    beforeEach(() => {
      spyGenerateToken = jest.spyOn(JwtAdapter, "generateToken");
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return token with duration", async () => {
      const payload = { id: "123" };
      const duration = "2h";
      const token = await JwtAdapter.generateToken(payload, duration);
      expect(spyGenerateToken).toHaveBeenCalledTimes(1);
      expect(spyGenerateToken).toHaveBeenCalledWith(payload, duration);
      expect(typeof token).toEqual("string");
      expect(token).toMatch(regex.token);
    });

    test("should return token without duration", async () => {
      const payload = { id: "123" };
      const token = await JwtAdapter.generateToken(payload);
      expect(spyGenerateToken).toHaveBeenCalledTimes(1);
      expect(spyGenerateToken).toHaveBeenCalledWith(payload);
      expect(typeof token).toEqual("string");
      expect(token).toMatch(regex.token);
    });

    test("should return null for failed token generation", async () => {
      const payload = { id: "123" };
      const duration = "qwe"; //Generate Error
      const token = await JwtAdapter.generateToken(payload, duration);
      expect(spyGenerateToken).toHaveBeenCalledTimes(1);
      expect(spyGenerateToken).toHaveBeenCalledWith(payload, duration);
      expect(token).toEqual(null);
    });
  });

  describe("test JwtAdapter.validateToken", () => {
    let spyValidateToken;

    beforeAll(() => {
      spyValidateToken = jest.spyOn(JwtAdapter, "validateToken");
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return payload for success decode", async () => {
      const payload = { id: "123" };
      const token = (await JwtAdapter.generateToken(payload)) as string;
      const decodeToken = await JwtAdapter.validateToken(token);
      expect(decodeToken).toEqual({
        ...payload,
        exp: expect.any(Number),
        iat: expect.any(Number),
      });
    });

    test("should return null with invalid token for decode", async () => {
      const token = "qwerty12345";
      const decodeToken = await JwtAdapter.validateToken(token);
      expect(decodeToken).toBe(null);
    });

    test("should return null with expired token for decode", async () => {
      const payload = { id: "123" };
      const duration = "1ms";
      const token = (await JwtAdapter.generateToken(
        payload,
        duration
      )) as string;
      setTimeout(async () => {
        const decodeToken = await JwtAdapter.validateToken(token);
        expect(decodeToken).toBe(null);
      }, 20);
    });
  });
});
