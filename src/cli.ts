#!/usr/bin/env node
import getConfig from "./config.js";
import BuildInfo, { type Source } from "./index.js";
import { ConsoleSink, FileSink, type Sink } from "./sinks.js";

const enum ExitCode {
	OK = 0,
	ERROR = 1,
}

const HELP = `
usage: buildinfo [-h] [-o OUTPUT]

options:
  -h, --help            show this help message and exit
  -o OUTPUT, --output OUTPUT
                        the file to write data to
`.trim();

const { help, output } = getConfig(process.argv.slice(2));

if (help) {
	await new ConsoleSink().write(HELP);
	process.exit(ExitCode.OK);
}

const sink: Sink = output ? new FileSink(output) : new ConsoleSink();
const source: Source = new BuildInfo();

try {
	const lines = await source.lines();
	await sink.write(lines.join("\n"));
	process.exit(ExitCode.OK);
} catch (err) {
	console.error(err);
	process.exit(ExitCode.ERROR);
}
