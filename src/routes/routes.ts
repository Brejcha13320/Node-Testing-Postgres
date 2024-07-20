import { Router, Express } from "express";

import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";

export class AppRoutes {
  static routes(app: Express) {
    const router = Router();
    app.use("/api", router);

    //Define Routes
    router.use("/auth", AuthRoutes.routes);
    router.use("/users", UserRoutes.routes);
  }
}
