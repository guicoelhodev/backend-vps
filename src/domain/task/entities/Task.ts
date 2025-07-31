export type TTask = {
	id: string;
	description: string;
	completed: boolean;
	createdAt: Date;
};

export class Task {
	constructor(private task: TTask) { }

	getTask() {
		return this.task;
	}
}
