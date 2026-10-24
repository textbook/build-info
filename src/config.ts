import { relative, sep } from "node:path";
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
	validate(values);
	return values;
}

function validate({ output }: Configuration): void {
	if (output) {
		const relativePath = relative(process.cwd(), output);
		if (relativePath.startsWith(`..${sep}`)) {
			throw new Error("'--output' must be within the working directory");
		}
	}
}
