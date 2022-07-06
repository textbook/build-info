import assert from "node:assert/strict";
import test from "node:test";

import sinon from "sinon";

import type { Run } from "./cmd.js";
import Git from "./git.js";

test("gets the git status", async () => {
	const run = sinon.stub().returns("");
	const cli = new Git(run);

	await cli.lines();

	sinon.assert.calledTwice(run);
	sinon.assert.calledWithExactly(run, "git status --porcelain");
	sinon.assert.calledWithExactly(run, "git show --no-patch  --format='%h %s'");
});

test("returns the output", async () => {
	const cli = new Git(gitStub({ show: "def5678 Other commit message", status: "foo\nbar\nbaz" }));

	assert.deepEqual(await cli.lines(), ["From: def5678 Other commit message", "With changes:", "foo", "bar", "baz"]);
});

test("doesn't include empty changes in output", async () => {
	const cli = new Git(gitStub({ show: "abc1234 Some commit message", status: "" }));

	const changes = await cli.lines();

	assert.deepEqual(changes, ["From: abc1234 Some commit message"]);
});

test("applies if git CLI is available", async () => {
	const run = sinon.stub().returns("everything is fine");
	const cli = new Git(run);

	assert.equal(await cli.applies(), true);

	sinon.assert.calledOnceWithExactly(run, "git status");
});

test("doesn't apply if git CLI is missing", async () => {
	const cli = new Git(() => Promise.reject({ stderr: "fatal: not a git repository (or any of the parent directories): .git\n" }));

	assert.equal(await cli.applies(), false);
});

function gitStub({ show, status }: { show: string; status: string }): Run {
	return (command) => {
		switch (command.substring(0, 6)) {
			case "git st":
				return Promise.resolve(status);
			case "git sh":
				return Promise.resolve(show);
			default:
				throw new Error(`unknown command: ${command}`);
		}
	};
}
