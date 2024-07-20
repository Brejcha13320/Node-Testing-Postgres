import { User, UserWithCategories } from "../../src/interfaces";
import { UserService } from "../../src/services";

describe("test for /services/user.service.ts", () => {
  const userService = new UserService();

  describe("test UserService.getAll", () => {
    const spyGetAll = jest.spyOn(userService, "getAll");
    const usersMock: User[] = [
      {
        id: "bbf39472-1356-4389-9b63-df6f582b5360",
        name: "Jesus",
        email: "jesus@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bbf39472-1356-4389-9b63-df6f582b5361",
        name: "David",
        email: "david@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return array of users", async () => {
      spyGetAll.mockResolvedValue(usersMock);

      const users = await userService.getAll();

      expect(spyGetAll).toHaveBeenCalledTimes(1);
      expect(users.length).toEqual(usersMock.length);
      expect(users).toEqual(usersMock);
    });

    test("should return empty array of users", async () => {
      spyGetAll.mockResolvedValue([]);

      const users = await userService.getAll();

      expect(spyGetAll).toHaveBeenCalledTimes(1);
      expect(users.length).toEqual(0);
      expect(users).toEqual([]);
    });

    test("should not have a password property", async () => {
      spyGetAll.mockResolvedValue(usersMock);

      const users = await userService.getAll();

      expect(spyGetAll).toHaveBeenCalledTimes(1);
      users.forEach((user) => {
        expect(user).not.toHaveProperty("password");
      });
    });
  });

  describe("test UserService.getAllWithCategories", () => {
    const spyGetAllWithCategories = jest.spyOn(
      userService,
      "getAllWithCategories"
    );
    const usersCategoriesMock: UserWithCategories[] = [
      {
        id: "bbf39472-1356-4389-9b63-df6f582b5360",
        name: "Jesus",
        email: "jesus@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: [
          {
            id: "bbf39472-1356-4389-9b63-df6f582b5360",
            userId: "bbf39472-1356-4389-9b63-df6f582b5360",
            name: "Category 1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: "bbf39472-1356-4389-9b63-df6f582b5360",
        name: "David",
        email: "david@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: [
          {
            id: "bbf39472-1356-4389-9b63-df6f582b5360",
            userId: "bbf39472-1356-4389-9b63-df6f582b5360",
            name: "Category 1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return array of users", async () => {
      spyGetAllWithCategories.mockResolvedValue(usersCategoriesMock);

      const users = await userService.getAllWithCategories();

      expect(spyGetAllWithCategories).toHaveBeenCalledTimes(1);
      expect(users.length).toEqual(usersCategoriesMock.length);
      expect(users).toEqual(usersCategoriesMock);
    });

    test("should return empty array of users", async () => {
      spyGetAllWithCategories.mockResolvedValue([]);

      const users = await userService.getAllWithCategories();

      expect(spyGetAllWithCategories).toHaveBeenCalledTimes(1);
      expect(users.length).toEqual(0);
      expect(users).toEqual([]);
    });

    test("should not have a password property", async () => {
      spyGetAllWithCategories.mockResolvedValue(usersCategoriesMock);

      const users = await userService.getAllWithCategories();

      expect(spyGetAllWithCategories).toHaveBeenCalledTimes(1);
      users.forEach((user) => {
        expect(user).not.toHaveProperty("password");
      });
    });

    test("should have a categories property", async () => {
      spyGetAllWithCategories.mockResolvedValue(usersCategoriesMock);

      const users = await userService.getAllWithCategories();

      expect(spyGetAllWithCategories).toHaveBeenCalledTimes(1);
      users.forEach((user) => {
        expect(user).toHaveProperty("categories");
      });
    });
  });
});
