#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

import BuildInfo from "./index.js";

const enum ExitCode {
	OK = 0,
	ERROR = 1,
}

const buildInfo: BuildInfo = new BuildInfo({ now: () => new Date() });

const [, , file] = process.argv;

if (!file) {
	console.error("Usage: buildinfo <file>");
	process.exit(ExitCode.ERROR);
}

(async () => {
	try {
		await fs.mkdir(path.dirname(file), { recursive: true });
		await fs.writeFile(file, buildInfo.lines().join("\n"));
		process.exit(ExitCode.OK);
	} catch (err) {
		console.error(err);
		process.exit(ExitCode.ERROR);
	}
})();