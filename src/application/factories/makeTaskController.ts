import { PrismaTaskRepository } from "@/data/repositories/TaskPrismaRepository";
import { TaskController } from "@/presentation/controllers/TaskController";
import { CreateTaskUseCase } from "../useCases/task/CreateTaskUseCase";
import { GetTaskUseCase } from "../useCases/task/GetTaskUseCase";

export function makeTaskController(): TaskController {
	const taskRepository = new PrismaTaskRepository();

	const createTaskUseCase = new CreateTaskUseCase(taskRepository);
	const getTaskUseCase = new GetTaskUseCase(taskRepository);

	const controller = new TaskController(createTaskUseCase, getTaskUseCase);

	return controller;
}
