import { FastifyInstance } from "fastify";
import { healthRoutes } from "./health";

export async function registerRoutes(server: FastifyInstance) {
	await server.register(healthRoutes);
}
