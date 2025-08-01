import esbuild from "esbuild";

esbuild
	.build({
		entryPoints: ["./src/index.ts"],
		bundle: true,
		platform: "node",
		target: "node20",
		outfile: "./build/index.js",
		sourcemap: true,
		alias: {
			"@": "./src",
		},
		external: ["dotenv"],
	})
	.catch(() => process.exit(1));
