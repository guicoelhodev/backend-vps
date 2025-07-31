import { FastifyInstance } from "fastify";
import { taskRoutes } from "./task";
import { healthRoute } from "./health";

export async function registerRoutes(server: FastifyInstance) {
	await server.register(taskRoutes, { prefix: "/task" });
	await server.register(healthRoute);
}
