import fastify from "fastify";
import "dotenv/config";
import { registerRoutes } from "./routes";

const server = fastify();

registerRoutes(server);

server.listen(
  {
    port: Number(process.env.PORT) || 8080,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
  },
);
