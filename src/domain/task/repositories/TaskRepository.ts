import { Task, TTask } from "../entities/Task";

export interface TaskRepository {
	getTask(taskId: string): Promise<TTask | null>;
	getAllTasks(): Promise<TTask[]>;
	createTask(task: Task): Promise<TTask>;
}
