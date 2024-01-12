import { parseArgs } from "node:util";

interface Configuration {
	help: boolean | undefined;
	output: string | undefined;
}

export default function getConfig(args: string[]): Configuration {
	const { values } = parseArgs({
		args,
		options: {
			help: { short: "h", type: "boolean" },
			output: { short: "o", type: "string" },
		},
	});
	return values;
}
