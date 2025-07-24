import { FastifyInstance } from "fastify";

export async function healthRoutes(server: FastifyInstance) {
	server.get("/health", async (_, reply) => {
		try {
			reply.send({ status: "Server is running correctly" });
		} catch (err) {
			server.log.error(err);
			return reply.status(500).send({
				error: "Internal server error",
				description: (err as Error).message,
			});
		}
	});
}
