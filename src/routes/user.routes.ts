import { Router } from "express";
import { UserService } from "../services";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const controller = new UserController(userService);

    //Middlewares Para Todas las Rutas
    router.use([AuthMiddleware.validateToken]);

    router.get("/", controller.getAll);
    router.get("/categories", controller.getAllWithCategories);

    return router;
  }
}
