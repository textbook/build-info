#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

import GitCli from "./git.js";
import BuildInfo, { type Clock } from "./index.js";

const enum ExitCode {
	OK = 0,
	ERROR = 1,
}

const wallClock: Clock = { now: () => new Date() };

const buildInfo: BuildInfo = new BuildInfo(wallClock, new GitCli());

const [, , file] = process.argv;

if (!file) {
	console.error("Usage: buildinfo <file>");
	process.exit(ExitCode.ERROR);
}

try {
	await fs.mkdir(path.dirname(file), { recursive: true });
	const lines = await buildInfo.lines();
	await fs.writeFile(file, lines.join("\n"));
	process.exit(ExitCode.OK);
} catch (err) {
	console.error(err);
	process.exit(ExitCode.ERROR);
}
