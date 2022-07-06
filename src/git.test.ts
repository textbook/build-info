import assert from "node:assert/strict";
import test from "node:test";

import sinon from "sinon";

import GitCli from "./git.js";

test("gets the git status", async () => {
	const run = sinon.stub().returns("");
	const cli = new GitCli(run);

	await cli.lines();

	sinon.assert.calledOnceWithExactly(run, "git status --porcelain");
});

test("returns the output", async () => {
	const cli = new GitCli(() => Promise.resolve("foo\nbar\nbaz"));

	const changes = await cli.lines();

	assert.deepEqual(changes, ["With changes:", "foo", "bar", "baz"]);
});

test("doesn't include empty output", async () => {
	const cli = new GitCli(() => Promise.resolve(""));

	const changes = await cli.lines();

	assert.deepEqual(changes, []);
});

test("applies if git CLI is available", async () => {
	const run = sinon.stub().returns("everything is fine");
	const cli = new GitCli(run);

	assert.equal(await cli.applies(), true);

	sinon.assert.calledOnceWithExactly(run, "git status");
});

test("doesn't apply if git CLI is missing", async () => {
	const cli = new GitCli(() => Promise.reject({ stderr: "fatal: not a git repository (or any of the parent directories): .git\n" }));

	assert.equal(await cli.applies(), false);
});
