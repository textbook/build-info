import { type ExecException } from "node:child_process";

import { expect } from "chai";
import sinon from "sinon";

import type { Run } from "./cmd.ts";
import Git from "./git.ts";

describe("Git", () => {
	it("gets the git status", async () => {
		const run = sinon.stub().returns("");
		const cli = new Git(run);

		await cli.lines();

		sinon.assert.calledTwice(run);
		sinon.assert.calledWithExactly(run, "git status --porcelain");
		sinon.assert.calledWithExactly(run, 'git show --no-patch --format="%h %s"');
	});

	it("returns the output", async () => {
		const cli = new Git(gitStub({ show: "def5678 Other commit message", status: " foo\n bar\n baz\n" }));

		expect(await cli.lines()).to.deep.equal([
			{ content: "def5678 Other commit message", label: "From", name: "from" },
			{ content: " foo\n bar\n baz", label: "With changes", name: "changes" },
		]);
	});

	it("trims multiline commit messages", async () => {
		const cli = new Git(gitStub({ show: "abc1234 Some commit message\n\n", status: "" }));

		const changes = await cli.lines();

		expect(changes).to.deep.equal([
			{ content: "abc1234 Some commit message", label: "From", name: "from" },
		]);
	});

	it("doesn't include empty changes in output", async () => {
		const cli = new Git(gitStub({ show: "abc1234 Some commit message", status: "" }));

		const changes = await cli.lines();

		expect(changes).to.deep.equal([
			{ content: "abc1234 Some commit message", label: "From", name: "from" },
		]);
	});

	it("applies if git CLI is available", async () => {
		const run = sinon.stub().returns("everything is fine");
		const cli = new Git(run);

		expect(await cli.applies()).to.equal(true);

		sinon.assert.calledOnceWithExactly(run, "git status");
	});

	it("doesn't apply if git command errors", async () => {
		const stderr = "fatal: not a git repository (or any of the parent directories): .git\n";
		const cli = new Git((cmd) => Promise.reject(createError({ cmd, code: 128, stderr })));

		expect(await cli.applies()).to.equal(false);
	});
});

type ProcessException = ExecException & { stderr?: string; stdout?: string };

function createError(overrides: Omit<ProcessException, keyof Error>): ProcessException {
	return Object.assign(new Error(), { cmd: "", code: 1, killed: false, stderr: "", stdout: "", ...overrides });
}

function gitStub({ show, status }: { show: string; status: string }): Run {
	return (command) => {
		switch (command.substring(0, 6)) {
			case "git st":
				return Promise.resolve(status);
			case "git sh":
				return Promise.resolve(show);
			default:
				return Promise.reject(createError({ cmd: command, code: 127, stderr: `unknown command: ${command}` }));
		}
	};
}
