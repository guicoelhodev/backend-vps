import { FastifyInstance } from "fastify";
import z from "zod";

const createTaskSchema = z.object({
	description: z.string().min(1, "Name is required"),
});

const updateTaskSchema = z
	.object({
		description: z.string().optional(),
		completed: z.boolean().optional(),
		id: z.string().min(1, "Task ID is required"),
	})
	.refine(
		(data) => data.description !== undefined || data.completed !== undefined,
		{
			message: "At least one of 'description' or 'completed' must be provided",
			path: [],
		},
	);

type TCreateSchema = { description: string; id: string; completed: boolean };

const taskList: TCreateSchema[] = [];

export async function taskRoutes(server: FastifyInstance) {
	server.get("/", (_, reply) => {
		reply.status(200).send({
			task: taskList,
		});
	});

	server.post("/", (request, reply) => {
		const parseResult = createTaskSchema.safeParse(request.body);

		if (!parseResult.success) {
			return reply.status(400).send({
				errors: parseResult.error.issues,
			});
		}

		const taskId = crypto.randomUUID();

		taskList.push({
			id: taskId,
			description: parseResult.data.description,
			completed: false,
		});

		reply.status(201).send({
			message: `Task created: ${taskId}`,
		});
	});

	server.put("/", (request, reply) => {
		const parseResult = updateTaskSchema.safeParse(request.body);

		if (!parseResult.success) {
			return reply.status(400).send({
				errors: parseResult.error.issues,
			});
		}

		const id = parseResult.data.id;
		const indexIdList = taskList.findIndex((i) => i.id === id);

		if (indexIdList === -1) {
			return reply.status(400).send({
				errors: "task ID not found",
			});
		}

		Object.assign(taskList[indexIdList], parseResult.data);

		return reply.status(200).send({
			message: `Update task ${id} successfully`,
		});
	});
}
