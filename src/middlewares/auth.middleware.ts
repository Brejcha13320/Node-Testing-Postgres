import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import { prisma } from "../database";

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res
        .status(401)
        .json({ authorization: false, error: "not token provided" });

    if (!authorization.startsWith("Bearer "))
      return res
        .status(401)
        .json({ authorization: false, error: "invalid bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload)
        return res
          .status(401)
          .json({ authorization: false, error: "invalid token" });

      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user)
        return res.status(401).json({
          authorization: false,
          error: "invalid token - user not found",
        });

      const { password, ...dataUser } = user;

      req.body.user = dataUser;
      next();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ authorization: false, error: "Internal Server Error" });
    }
  }
}
