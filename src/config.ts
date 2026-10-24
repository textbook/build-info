import { parseArgs } from "node:util";

interface Configuration {
	format?: string;
	help?: boolean;
	output?: string;
	version?: boolean;
}

export default function getConfig(args: string[]): Configuration {
	const { values } = parseArgs({
		args,
		options: {
			format: { short: "f", type: "string" },
			help: { short: "h", type: "boolean" },
			output: { short: "o", type: "string" },
			version: { short: "v", type: "boolean" },
		},
	});
	return values;
}
