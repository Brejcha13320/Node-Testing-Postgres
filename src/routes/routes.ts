import { Router } from "express";

import { ProductsRoutes } from "./products.routes";

export class AppRoutes {
  private static readonly basePath = "/api";
  static get routes(): Router {
    const router = Router();

    //Define Routes
    router.use(`${this.basePath}/products`, ProductsRoutes.routes);

    return router;
  }
}
