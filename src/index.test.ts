import assert from "node:assert/strict";
import test from "node:test";

import BuildInfo, { Clock } from ".";

const clock: Clock = {
	now: () => new Date(Date.UTC(2022, 0, 2, 3, 4, 5, 678)),
};

const buildInfo = new BuildInfo(clock);

test("includes the current time", () => {
	assert.deepEqual(buildInfo.lines(), [
		"Built: 2022-01-02T03:04:05.678Z"
	]);
});
