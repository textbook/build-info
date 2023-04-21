#!/usr/bin/env node
import getConfig from "./config.js";
import BuildInfo from "./index.js";
import { ConsoleSink, FileSink, type Sink } from "./sinks.js";
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

const [, , ...args] = process.argv;

const { output } = getConfig(args);

const sink: Sink = output ? new FileSink(output) : new ConsoleSink();

(async (): Promise<void> => {
	try {
		const lines = await buildInfo.lines();
		await sink.write(lines.join("\n"));
		process.exit(ExitCode.OK);
	} catch (err) {
		console.error(err);
		process.exit(ExitCode.ERROR);
	}
})();
