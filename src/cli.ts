#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

import BuildInfo from "./index.js";
import { CircleCI, Clock, Git, GitHubActions, Heroku, Netlify, User } from "./sources/index.js";

const enum ExitCode {
	OK = 0,
	ERROR = 1,
}

const buildInfo: BuildInfo = new BuildInfo([
	new Clock(),
	new User(),
	new Git(),
	new Heroku(),
	new GitHubActions(),
	new CircleCI(),
	new Netlify(),
]);

const [, , file] = process.argv;

if (!file) {
	console.error("Usage: buildinfo <file>");
	process.exit(ExitCode.ERROR);
}

(async (): Promise<void> => {
	try {
		await fs.mkdir(path.dirname(file), { recursive: true });
		const lines = await buildInfo.lines();
		await fs.writeFile(file, lines.join("\n"));
		process.exit(ExitCode.OK);
	} catch (err) {
		console.error(err);
		process.exit(ExitCode.ERROR);
	}
})();
