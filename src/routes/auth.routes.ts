import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new AuthController(authService);

    router.post("/login", (req, res) => {
      res.json({ message: "login" });
    });

    router.post("/register", controller.registerUser);

    return router;
  }
}
