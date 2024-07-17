import { Request, Response } from "express";
import { RegisterDto } from "../dtos";
import { HandleError } from "../errors/handle.error";
import { AuthService } from "../services";

export class AuthController {
  constructor(private authService: AuthService) {}

  //   loginUser = (req: Request, res: Response) => {
  //     const [error, loginUserDto] = LoginUserDto.create(req.body);
  //     if (error) return res.status(400).json({ error });

  //     this.authService
  //       .loginUser(loginUserDto!)
  //       .then((loginUser) => res.status(201).json(loginUser))
  //       .catch((error) => HandleError.error(error, res));
  //   };

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .register(registerDto!)
      .then((register: any) => res.status(201).json(register))
      .catch((error: unknown) => HandleError.error(error, res));
  };
}
