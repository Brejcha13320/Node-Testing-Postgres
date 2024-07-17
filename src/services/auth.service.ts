import { BcryptAdapter } from "../config";
import { prisma } from "../database";
import { RegisterDto } from "../dtos";
import boom from "@hapi/boom";

export class AuthService {
  async register(registerDto: RegisterDto) {
    const existUser = await prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existUser) throw boom.badRequest("email already exists");

    //Encript Password
    const passwordEncripted = BcryptAdapter.hash(registerDto.password);
    const user = {
      ...registerDto,
      password: passwordEncripted,
    };

    //Create User
    const { password, ...userCreate } = await prisma.user.create({
      data: user,
    });

    //Return User
    return { ...userCreate };
  }
}
