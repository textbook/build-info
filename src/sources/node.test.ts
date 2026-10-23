import { expect } from "chai";
import sinon from "sinon";

import Node from "./node.ts";
import { createError } from "./testUtils.ts";

describe("Node", () => {
	it("requests the Node version", async () => {
		const run = sinon.stub().returns("");
		const cli = new Node(run);

		await cli.lines();

		sinon.assert.calledOnce(run);
		sinon.assert.calledWithExactly(run, "node --version");
	});

	it("returns the output", async () => {
		const version = "v12.34.5";
		const cli = new Node(() => Promise.resolve(version));

		expect(await cli.lines()).to.deep.equal([
			{ content: version, label: "Using Node", name: "node" },
		]);
	});

	it("applies if Node CLI is available", async () => {
		const run = sinon.stub().returns("v12.34.5");
		const cli = new Node(run);

		expect(await cli.applies()).to.equal(true);

		sinon.assert.calledOnceWithExactly(run, "node --version");
	});

	it("doesn't apply if Node command errors", async () => {
		const stderr = "bash: command not found: node\n";
		const cli = new Node((cmd) => Promise.reject(createError({ cmd, code: 127, stderr })));

		expect(await cli.applies()).to.equal(false);
	});
});
