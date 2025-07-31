import { PrismaClient } from "@prisma/client";

export class PrismaDataSource {
	static instance: PrismaClient;

	static getInstance() {
		if (!this.instance) {
			PrismaDataSource.instance = new PrismaClient();
		}

		return this.instance;
	}

	static async connect() {
		try {
			await PrismaDataSource.getInstance().$connect();

			console.log("Database connected succesfully");
		} catch (error) {
			throw new Error(`Data base connection failed, ${error}`);
		}
	}
}
