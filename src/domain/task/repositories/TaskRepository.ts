import { Task, TTask } from "../entities/Task";

export interface TaskRepository {
	getTask(taskId: string): Promise<TTask | null>;
	createTask(task: Task): Promise<TTask>;
}
