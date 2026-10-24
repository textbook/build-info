#!/usr/bin/env node
import getConfig from "./config.ts";
import { type Formatter, getFormatter } from "./formatters.ts";
import BuildInfo, { type Source } from "./index.ts";
import { getPackageProperty } from "./package.ts";
import { ConsoleSink, FileSink, type Sink } from "./sinks.ts";

const HELP = `
usage: buildinfo [-h] [-f {html,json,text}] [-o OUTPUT] [-v]

options:
  -h, --help            show this help message and exit
  -f, --format {html,json,text}
                        the format to provide data in (defaults to json for
                        JSON files, html for HTML files, text otherwise)
  -o, --output OUTPUT   the file to write data to
  -v, --version         show program's version number and exit
`.trim();

const { format, help, output, version } = getConfig(process.argv.slice(2));

if (help ?? version) {
	await new ConsoleSink().write(help ? HELP : await getPackageProperty("version"));
	process.exit(0);
}

const formatter: Formatter = getFormatter({ format, output });
const sink: Sink = output ? new FileSink(output) : new ConsoleSink();
const source: Source = new BuildInfo();

try {
	const lines = await source.lines();
	await sink.write(formatter.format(lines));
	process.exit(0);
} catch (err) {
	console.error(err);
	process.exit(1);
}
