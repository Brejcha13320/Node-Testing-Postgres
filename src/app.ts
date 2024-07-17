import { Server } from "./server";
import { envs } from "./config";

(async () => {
  main();
})();

function main() {
  const port = envs.PORT;
  const server = Server.createServer();

  Server.startServer(server, port);
}
