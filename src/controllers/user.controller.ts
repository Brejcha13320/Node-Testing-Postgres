import { Request, Response } from "express";
import { HandleError } from "../errors/handle.error";
import { UserService } from "../services";

export class UserController {
  constructor(private userService: UserService) {}

  getAll = (req: Request, res: Response) => {
    this.userService
      .getAll()
      .then((users: any) => res.status(200).json(users))
      .catch((error: unknown) => HandleError.error(error, res));
  };

  getAllWithCategories = (req: Request, res: Response) => {
    this.userService
      .getAllWithCategories()
      .then((users: any) => res.status(200).json(users))
      .catch((error: unknown) => HandleError.error(error, res));
  };
}
