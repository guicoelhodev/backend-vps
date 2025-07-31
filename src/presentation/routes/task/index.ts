import { makeTaskController } from "@/application/factories/makeTaskController";
import { FastifyInstance } from "fastify";

export function taskRoutes(server: FastifyInstance) {
	const taskFactory = makeTaskController();
	server.get("/:taskId", taskFactory.getTask.bind(taskFactory));
	server.get("/", taskFactory.getAllTasks.bind(taskFactory));
	server.post("/", taskFactory.createTask.bind(taskFactory));
}
