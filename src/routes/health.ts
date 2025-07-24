import { FastifyInstance } from "fastify";

export async function healthRoutes(server: FastifyInstance) {
	server.get("/health", async (_, response) => {
		try {
			response.send({ status: "Server is running correctly" });
		} catch (err) {
			server.log.error(err);
			return response.status(500).send({
				error: "Internal server error",
				description: (err as Error).message,
			});
		}
	});
}
