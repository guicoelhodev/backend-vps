import { Task } from "../entities/Task";

export interface TaskRepository {
	getTask(taskId: string): Promise<Task | null>;
	createTask(task: Task): Promise<Task>;
}
