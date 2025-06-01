import { parse } from "node:path";

import type { Plugin, PluginContext } from "rollup";

import { FORMATTERS, type Format } from "./formatters.js";
import BuildInfo from "./index.js";
import { getPackageFile } from "./package.js";

export interface PluginOptions {
	filename: string;
	format?: Format;
}

export interface BuildInfoPlugin {
	name: string;
	version: string;
	buildEnd(this: PluginContext): Promise<void>;
	apply: "build";
}

const { name, version } = await getPackageFile();

export default function buildInfo({ filename, format = getFormat(filename) }: PluginOptions): BuildInfoPlugin {
	const plugin = {
		name,
		version,
		async buildEnd() {
			const formatter = new FORMATTERS[format]();
			const source = new BuildInfo();
			const lines = await source.lines();
			this.emitFile({ type: "asset", fileName: filename, source: formatter.format(lines) });
		},
	} satisfies Plugin;
	return { apply: "build", ...plugin };
}

function getFormat(filename: string): Format {
	switch (parse(filename).ext) {
		case ".json":
			return "json";
		case ".html":
			return "html";
		default:
			return "text";
	}
}
