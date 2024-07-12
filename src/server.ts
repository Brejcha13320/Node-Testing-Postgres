import express, { Router, Express } from "express";
import path from "path";
import cors from "cors";

interface Options {
  publicPath: string;
  routes: Router;
}

export class Server {
  static createServer({ publicPath, routes }: Options): Express {
    const app = express();
    //* Middlewares
    app.use(cors());
    app.use(express.json());

    //* Public Folder
    app.use(express.static(publicPath));

    //* Routes
    app.use(routes);

    //* SPA
    app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    return app;
  }

  static startServer(server: Express, port: number) {
    console.log(server, port);
    return server.listen(port, () => {
      console.log(`Server Running on Port ${port}`);
    });
  }
}
