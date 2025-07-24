import fastify from "fastify";
import "dotenv/config";

const server = fastify();

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

server.listen({ port: Number(process.env.PORT) || 8080 }, (err, address) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}

	console.log(`Server is now listening on ${address}`);
});
