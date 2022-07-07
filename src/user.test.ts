import assert from "node:assert/strict";
import test from "node:test";

import sinon from "sinon";

import User from "./user.js";

test("returns the result from whoami", async () => {
	const run = sinon.stub().resolves("Jane Doe\n");

	const user = new User(run);

	assert.deepEqual(await user.lines(), ["By: Jane Doe"]);
	sinon.assert.calledOnceWithExactly(run, "whoami");
});
