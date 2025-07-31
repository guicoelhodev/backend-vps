import { TaskRepository } from "@/domain/task/repositories/TaskRepository";
import { Task } from "@/domain/task/entities/Task";

export class CreateTaskUseCase {
	constructor(private taskRepository: TaskRepository) { }

	async execute(description: string) {
		if (!description.length) throw new Error("Description cannot be empty");

		const task = new Task({
			createdAt: new Date(),
			description: description,
			id: crypto.randomUUID(),
			completed: false,
		});

		return await this.taskRepository.createTask(task);
	}
}
