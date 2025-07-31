import { FastifyInstance } from "fastify";

export function healthRoute(server: FastifyInstance) {
	server.get("/health", (request, response) => {
		try {
			return response.status(200).send({
				message: "Server work perfectly",
			});
		} catch (err) {
			console.error("Error on health route", (err as Error).message);
			return response.status(400).send({
				message: "Error on load server",
			});
		}
	});
}
