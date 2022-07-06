import { exec } from "node:child_process";
import { promisify } from "node:util";

import { type Source } from "./index.js";

export type Run = (command: string) => Promise<string>;

const runCommand: Run = async (command) => {
	const { stderr, stdout } = await promisify(exec)(command);
	if (stderr) {
		throw new Error(stderr);
	}
	return stdout;
};

export default class GitCli implements Source {

	constructor(private run: Run = runCommand) {}

	async applies(): Promise<boolean> {
		try {
			await this.run("git status");
			return true;
		} catch (err) {
			return false;
		}
	}

	async lines(): Promise<string[]> {
		return [`From: ${await this.commit()}`, ...await this.changes()];
	}

	private async commit(): Promise<string> {
		const commit = await this.run("git show --no-patch  --format='%h %s'");
		return commit.trim();
	}

	private async changes(): Promise<string[]> {
		const stdout = await this.run("git status --porcelain");
		return stdout ? ["With changes:", ...stdout.split("\n")] : [];
	}
}
