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
