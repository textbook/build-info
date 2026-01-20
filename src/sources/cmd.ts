import { exec } from "node:child_process";
import { promisify } from "node:util";

export type Run = (command: string) => Promise<string>;

const runCommand: Run = async (command) => {
	const { stderr, stdout } = await promisify(exec)(command);
	if (stderr) {
		throw new Error(stderr);
	}
	return stdout;
};

export abstract class Cmd {
	protected run: Run;

	constructor(run: Run = runCommand) {
		this.run = run;
	}
}
