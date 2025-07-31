import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "@/application/useCases/task/CreateTaskUseCase";
import { GetTaskUseCase } from "@/application/useCases/task/GetTaskUseCase";

const createTaskSchema = z.object({
	description: z.string().min(1, "Description is requestuired"),
});
export class TaskController {
	constructor(
		private createTaskUseCase: CreateTaskUseCase,
		private getTaskUseCase: GetTaskUseCase,
	) { }

	async getTask(
		request: FastifyRequest<{ Params: { taskId: string } }>,
		response: FastifyReply,
	) {
		try {
			const task = await this.getTaskUseCase.execute(request.params.taskId);

			return response.status(200).send(task);
		} catch (err) {
			return response.status(400).send({
				error: (err as Error).message,
			});
		}
	}

	async createTask(request: FastifyRequest, response: FastifyReply) {
		try {
			const parsed = createTaskSchema.safeParse(request.body);
			if (!parsed.success) {
				return response.status(400).send({
					error: "Validation failed",
					details: parsed.error.issues,
				});
			}

			const task = await this.createTaskUseCase.execute(
				parsed.data?.description,
			);

			return response.status(200).send(task);
		} catch (err) {
			return response.status(400).send({
				error: (err as Error).message,
			});
		}
	}
}
