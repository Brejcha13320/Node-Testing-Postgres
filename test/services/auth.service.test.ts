import { RegisterDto } from "../../src/dtos";
import { User } from "../../src/interfaces";
import { AuthService } from "../../src/services";

describe("test for /services/auth.service.ts", () => {
  const authService = new AuthService();

  describe("test for AuthService.register", () => {
    const spyRegister = jest.spyOn(authService, "register");
    const registerDTOMock: RegisterDto = {
      name: "Jesus",
      email: "jesus@gmail.com",
      password: "123456",
    };
    const userCreatedMock: User = {
      id: "bbf39472-1356-4389-9b63-df6f582b5360",
      name: "Jesus",
      email: "jesus@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return a user created", async () => {
      spyRegister.mockResolvedValue(userCreatedMock);

      const userCreated = await authService.register(registerDTOMock);

      expect(spyRegister).toHaveBeenCalledTimes(1);
      expect(spyRegister).toHaveBeenCalledWith(registerDTOMock);
      expect(userCreated).toEqual(userCreatedMock);
    });

    test("should not have a password property", async () => {
      spyRegister.mockResolvedValue(userCreatedMock);

      const userCreated = await authService.register(registerDTOMock);

      expect(userCreated).not.toHaveProperty("password");
    });
  });
});
