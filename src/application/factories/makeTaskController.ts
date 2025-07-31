import { PrismaTaskRepository } from "@/data/repositories/TaskPrismaRepository";
import { TaskController } from "@/presentation/controllers/TaskController";
import { CreateTaskUseCase } from "../useCases/task/CreateTaskUseCase";
import { GetTaskUseCase } from "../useCases/task/GetTaskUseCase";
import { GetAllTasksUseCase } from "../useCases/task/GetAllTasksUseCase";

export function makeTaskController(): TaskController {
	const taskRepository = new PrismaTaskRepository();

	const createTaskUseCase = new CreateTaskUseCase(taskRepository);
	const getTaskUseCase = new GetTaskUseCase(taskRepository);
	const getAllTasks = new GetAllTasksUseCase(taskRepository);

	const controller = new TaskController(
		createTaskUseCase,
		getTaskUseCase,
		getAllTasks,
	);

	return controller;
}
