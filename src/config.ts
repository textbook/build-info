import { parseArgs } from "node:util";

interface Configuration {
	output: string | undefined;
}

export default function getConfig(args: string[]): Configuration {
	const { values } = parseArgs({
		args,
		options: {
			output: { short: "o", type: "string" },
		},
	});
	return values;
}
