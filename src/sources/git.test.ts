import { expect } from "chai";
import sinon from "sinon";

import type { Run } from "./cmd.js";
import Git from "./git.js";

describe("Git", () => {
	it("gets the git status", async () => {
		const run = sinon.stub().returns("");
		const cli = new Git(run);

		await cli.lines();

		sinon.assert.calledTwice(run);
		sinon.assert.calledWithExactly(run, "git status --porcelain");
		sinon.assert.calledWithExactly(run, 'git show --no-patch  --format="%h %s"');
	});

	it("returns the output", async () => {
		const cli = new Git(gitStub({ show: "def5678 Other commit message", status: " foo\n bar\n baz\n" }));

		expect(await cli.lines()).to.deep.equal(["From: def5678 Other commit message", "With changes:", " foo", " bar", " baz"]);
	});

	it("trims multiline commit messages", async () => {
		const cli = new Git(gitStub({ show: "abc1234 Some commit message\n\n", status: "" }));

		const changes = await cli.lines();

		expect(changes).to.deep.equal(["From: abc1234 Some commit message"]);
	});

	it("doesn't include empty changes in output", async () => {
		const cli = new Git(gitStub({ show: "abc1234 Some commit message", status: "" }));

		const changes = await cli.lines();

		expect(changes).to.deep.equal(["From: abc1234 Some commit message"]);
	});

	it("applies if git CLI is available", async () => {
		const run = sinon.stub().returns("everything is fine");
		const cli = new Git(run);

		expect(await cli.applies()).to.equal(true);

		sinon.assert.calledOnceWithExactly(run, "git status");
	});

	it("doesn't apply if git CLI is missing", async () => {
		const cli = new Git(() => Promise.reject({ stderr: "fatal: not a git repository (or any of the parent directories): .git\n" }));

		expect(await cli.applies()).to.equal(false);
	});
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
