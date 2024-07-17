import { Server } from "./server";
import { envs } from "./config";
import { AppRoutes } from "./routes/routes";

(async () => {
  main();
})();

function main() {
  const port = envs.PORT;
  const server = Server.createServer();

  Server.startServer(server, port);
}
