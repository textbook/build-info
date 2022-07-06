import assert from "node:assert/strict";
import test from "node:test";

import BuildInfo from "./index.js";

test("includes all source lines", async () => {
	const buildInfo = new BuildInfo([
		{ lines: () => ["foo"] },
		{ lines: () => Promise.resolve(["bar"]) },
	]);

	assert.deepEqual(await buildInfo.lines(), ["foo", "bar"]);
});

test("excludes sources that don't apply", async () => {
	const buildInfo = new BuildInfo([
		{ applies: () => true, lines: () => ["foo"] },
		{ applies: () => false, lines: () => Promise.resolve(["bar"]) },
	]);

	assert.deepEqual(await buildInfo.lines(), ["foo"]);
});
