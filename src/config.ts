import { parseArgs } from "node:util";

import { Format, FORMATTERS } from "./formatters.js";

interface Configuration {
	format: Format;
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
	const { format = "text" } = values;
	validateFormat(format);
	return { ...values, format };
}

function validateFormat(format: string | undefined): asserts format is Format {
	if (!format || !(format in FORMATTERS)) {
		throw new Error(`Invalid format ${JSON.stringify(format)}`);
	}
}
