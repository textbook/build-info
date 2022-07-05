import { exec } from "node:child_process";
import { promisify } from "node:util";

import { type Git } from "./index.js";

export type Run = (command: string) => Promise<string>;

const runCommand: Run = async (command) => {
	const { stderr, stdout } = await promisify(exec)(command);
	if (stderr) {
		throw new Error(stderr);
	}
	return stdout;
};

export default class GitCli implements Git {

	constructor(private run: Run = runCommand) {}

	async changes(): Promise<string[]> {
		const stdout = await this.run("git status --porcelain");
		return stdout.split("\n");
	}
}
