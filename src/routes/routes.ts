import { Router, Express } from "express";

import { ProductsRoutes } from "./products.routes";
import { AuthRoutes } from "./auth.routes";

export class AppRoutes {
  static routes(app: Express) {
    const router = Router();
    app.use("/api", router);

    //Define Routes
    router.use("/products", ProductsRoutes.routes);
    router.use("/auth", AuthRoutes.routes);
  }
}
