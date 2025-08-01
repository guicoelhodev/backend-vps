import fastify from "fastify";
import "dotenv/config";
import { registerRoutes } from "./presentation/routes";
import { PrismaDataSource } from "./data/datasource/PrismaDataSource";

const server = fastify();

async function bootstrap() {
	try {
		await PrismaDataSource.connect();

		registerRoutes(server);

		await server.listen({
			port: Number(process.env.PORT) || 8080,
			host: "0.0.0.0",
		});

		console.log("Server is now listening", process.env.PORT);
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

bootstrap();
