import boom from "@hapi/boom";
import { prisma } from "../database";
import { Login, Register } from "../interfaces";
import { LoginDto, RegisterDto } from "../dtos";
import { BcryptAdapter, JwtAdapter } from "../config";

export class AuthService {
  async loginUser(loginUserDto: LoginDto): Promise<Login> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) throw boom.badRequest("invalid credentials");

    const isMatching = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw boom.badRequest("invalid credentials");

    const { password, ...userData } = user;

    const access_token = (await JwtAdapter.generateToken(
      { id: user.id },
      "6h"
    )) as string;

    if (!access_token) throw boom.badRequest("error while creating jwt");

    return { user: userData, access_token };
  }

  async register(registerDto: RegisterDto): Promise<Register> {
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
