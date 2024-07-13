import { config } from "dotenv";

const env = process.env.NODE_ENV || "develop";

if (env !== "ci") {
  config({
    path: ".env.test",
  });
}
