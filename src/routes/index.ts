import { FastifyInstance } from "fastify";
import { healthRoutes } from "./health";
import { taskRoutes } from "./task";

export async function registerRoutes(server: FastifyInstance) {
	await server.register(healthRoutes);
	await server.register(taskRoutes, { prefix: "task" });
}
