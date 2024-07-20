import { prisma } from "../database";
import { User, UserWithCategories } from "../interfaces";

export class UserService {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    const usersData = users.map(({ password, ...userData }) => userData);
    return usersData;
  }

  async getAllWithCategories(): Promise<UserWithCategories[]> {
    const users = await prisma.user.findMany({ include: { categories: true } });
    const usersData = users.map(({ password, ...userData }) => userData);
    return usersData;
  }
}
