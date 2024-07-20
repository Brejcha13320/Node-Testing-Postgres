import express, { Express } from "express";
import path from "path";
import cors from "cors";
import { envs } from "./config";
import { AppRoutes } from "./routes/routes";

export class Server {
  static createServer(): Express {
    const app = express();
    const publicPath = envs.PUBLIC_PATH;
    //* Middlewares
    app.use(cors());
    app.use(express.json());

    //* Public Folder
    app.use(express.static(publicPath));

    //* Routes
    AppRoutes.routes(app);

    //* SPA
    app.get("*", (req, res) => {
      const indexPath = path.join(__dirname + `../../${publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    return app;
  }

  static startServer(server: Express, port: number) {
    return server.listen(port, () => {
      console.log(`Server Running on Port ${port}`);
    });
  }
}
