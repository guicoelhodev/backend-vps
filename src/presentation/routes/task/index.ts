import { makeTaskController } from "@/application/factories/makeTaskController";
import { FastifyInstance } from "fastify";

export function taskRoutes(server: FastifyInstance) {
	const taskFactory = makeTaskController();
	server.get("/:taskId", taskFactory.getTask);
}
