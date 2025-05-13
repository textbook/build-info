import { parse } from "node:path";

import type { PluginContext, Plugin } from "rollup";

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
}

const { name, version } = await getPackageFile();

export default function buildInfo({ filename, format = getFormat(filename) }: PluginOptions): BuildInfoPlugin {
	return {
		name,
		version,
		async buildEnd() {
			const formatter = new FORMATTERS[format]();
			const source = new BuildInfo();
			const lines = await source.lines();
			this.emitFile({ type: "asset", fileName: filename, source: formatter.format(lines) });
		},
	} satisfies Plugin;
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
