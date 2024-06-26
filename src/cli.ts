#!/usr/bin/env node
import getConfig from "./config.js";
import BuildInfo, { type Source } from "./index.js";
import { getPackageProperty } from "./package.js";
import { ConsoleSink, FileSink, type Sink } from "./sinks.js";

const enum ExitCode {
	OK = 0,
	ERROR = 1,
}

const HELP = `
usage: buildinfo [-h] [-o OUTPUT] [-v]

options:
  -h, --help            show this help message and exit
  -o OUTPUT, --output OUTPUT
                        the file to write data to
  -v, --version         show the version and exit
`.trim();

const { help, output, version } = getConfig(process.argv.slice(2));

if (help ?? version) {
	await new ConsoleSink().write(help ? HELP : await getPackageProperty("version"));
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
