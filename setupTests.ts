import { config } from "dotenv";

const env = process.env.NODE_ENV || "develop";

const envs = {
  develop: ".env",
  test: ".env.test",
};

if (envs[env]) {
  config({
    path: envs[env],
  });
}
