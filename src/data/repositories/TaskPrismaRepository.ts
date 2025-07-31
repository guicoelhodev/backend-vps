import { PrismaClient } from "@prisma/client";
import { PrismaDataSource } from "../datasource/PrismaDataSource";
import { TaskRepository } from "@/domain/task/repositories/TaskRepository";
import { Task, TTask } from "@/domain/task/entities/Task";

export class PrismaTaskRepository implements TaskRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = PrismaDataSource.getInstance();
	}

	async createTask(task: Task): Promise<TTask> {
		const taskData = task.getTask();

		const taskPrisma = await this.prisma.task.create({
			data: taskData
		});

		return taskPrisma
	}

	async getTask(taskId: string): Promise<TTask | null> {

		const taskPrisma = await this.prisma.task.findFirst({
			where: { id: taskId }
		});

		return taskPrisma
	}
}
