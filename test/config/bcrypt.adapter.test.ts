import { BcryptAdapter } from "../../src/config";

describe("test config/bcrypt.adapter.ts", () => {
  describe("test BcryptAdapter.hash", () => {
    let spyHash: jest.SpyInstance;

    beforeEach(() => {
      spyHash = jest.spyOn(BcryptAdapter, "hash");
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return a string with password hashed", () => {
      const password = "jesus123";
      const passwordHashed = BcryptAdapter.hash(password);
      expect(spyHash).toHaveBeenCalledTimes(1);
      expect(spyHash).toHaveBeenCalledWith(password);
      expect(typeof passwordHashed).toEqual("string");
    });
  });

  describe("test BcryptAdapter.compare", () => {
    let spyCompare: jest.SpyInstance;
    beforeEach(() => {
      spyCompare = jest.spyOn(BcryptAdapter, "compare");
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return false for a failed comparison", () => {
      const password = "jesus123";
      const hashed = "asdqwewd12";
      const compareStatus = BcryptAdapter.compare(password, hashed);
      expect(spyCompare).toHaveBeenCalledTimes(1);
      expect(spyCompare).toHaveBeenCalledWith(password, hashed);
      expect(compareStatus).toBe(false);
    });

    test("should return true for a success comparison", () => {
      const password = "jesus123";
      const hashed = BcryptAdapter.hash(password);
      const compareStatus = BcryptAdapter.compare(password, hashed);
      expect(spyCompare).toHaveBeenCalledTimes(1);
      expect(spyCompare).toHaveBeenCalledWith(password, hashed);
      expect(compareStatus).toBe(true);
    });
  });
});
