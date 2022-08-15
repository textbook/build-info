import assert from "node:assert/strict";
import test from "node:test";

import CircleCI from "./circle.js";

test("applies if running in CircleCI", () => {
	const circleCi = new CircleCI({ CIRCLECI: "true" });

	assert.equal(circleCi.applies(), true);
});

test("does not apply if not running in CircleCI", () => {
	const circleCi = new CircleCI({});

	assert.equal(circleCi.applies(), false);
});

test("includes build number and link", () => {
	const circleCi = new CircleCI({
		CIRCLE_BUILD_NUM: "1234",
		CIRCLE_BUILD_URL: "https://example.com/build/1234",
	});

	assert.deepEqual(circleCi.lines(), [
		"In: CircleCI build 1234",
		"URL: https://example.com/build/1234",
	]);
});
