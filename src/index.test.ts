import assert from "node:assert/strict";
import test from "node:test";

import BuildInfo, { type Clock } from "./index.js";

const clock: Clock = {
	now: () => new Date(Date.UTC(2022, 0, 2, 3, 4, 5, 678)),
};


test("includes the current time", async () => {
	const buildInfo = new BuildInfo(clock, { changes: () => Promise.resolve([]) });

	const [built] = await buildInfo.lines();

	assert.equal(built, "Built: 2022-01-02T03:04:05.678Z");
});

test("includes any git changes", async () => {
	const buildInfo = new BuildInfo(clock, { changes: () => Promise.resolve(["foo", "bar"]) });
	const lines = await buildInfo.lines();
	assert.deepEqual(lines.slice(1, 4), ["With changes:", "foo", "bar"]);
});

test("doesn't include 'With changes' otherwise", async () => {
	const buildInfo = new BuildInfo(clock, { changes: () => Promise.resolve([]) });
	const lines = await buildInfo.lines();
	assert.equal(lines.length, 1);
});
