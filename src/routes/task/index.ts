import { FastifyInstance } from "fastify";

type TTask = { id: string; name: string; completed: boolean };

const taskList: TTask[] = [];

export async function taskRoutes(server: FastifyInstance) {
	server.get("/", (_, reply) => {
		reply.status(200).send({
			task: taskList,
		});
	});

	server.post("/", (request, reply) => {
		const body = request.body as { name: string };

		if (!body.name) {
			return reply.status(400).send({ error: "Name is required" });
		}

		const taskId = crypto.randomUUID();

		taskList.push({ id: taskId, name: body.name, completed: false });

		reply.status(201).send({
			message: `Task created: ${taskId}`,
		});
	});
}
