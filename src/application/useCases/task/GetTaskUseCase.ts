import { TaskRepository } from "@/domain/task/repositories/TaskRepository";

export class GetTaskUseCase {
	constructor(private taskRepository: TaskRepository) { }

	private isValidUUID(uuid: string): boolean {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(uuid);
	}

	async execute(taskId: string) {
		if (!this.isValidUUID(taskId)) {
			throw new Error("Invalid taskId");
		}

		return await this.taskRepository.getTask(taskId);
	}
}
