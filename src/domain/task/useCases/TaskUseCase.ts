import { TaskRepository } from "@/domain/task/repositories/TaskRepository";
import { Task } from "@/domain/task/entities/Task";

export class TaskUseCase {
	constructor(private taskRepository: TaskRepository) { }

	private isValidUUID(uuid: string): boolean {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(uuid);
	}

	async getTask(taskId: string): Promise<Task | null> {
		if (!this.isValidUUID(taskId)) {
			throw new Error("Invalid taskId");
		}

		return this.taskRepository.getTask(taskId);
	}

	async createTask(description: string): Promise<Task> {
		if (!description.length) throw new Error("Description cannot be empty");

		const task = new Task({
			createdAt: new Date(),
			description: description,
			id: crypto.randomUUID(),
			completed: false,
		});

		return this.taskRepository.createTask(task);
	}
}
