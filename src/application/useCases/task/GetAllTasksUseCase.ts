import { TaskRepository } from "@/domain/task/repositories/TaskRepository";

export class GetAllTasksUseCase {
	constructor(private taskRepository: TaskRepository) { }

	async execute() {
		return await this.taskRepository.getAllTasks();
	}
}
