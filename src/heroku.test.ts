import assert from "node:assert/strict";
import test from "node:test";

import Heroku from "./heroku.js";

test("applies if running in Heroku", () => {
	const heroku = new Heroku({ SOURCE_VERSION: "abc1234" });

	assert.equal(heroku.applies(), true);
});

test("does not apply if not running in Heroku", () => {
	const heroku = new Heroku({});

	assert.equal(heroku.applies(), false);
});

test("exposes the source version", () => {
	const heroku = new Heroku({ SOURCE_VERSION: "abc1234" });

	assert.deepEqual(heroku.lines(), ["By: Heroku", "From: abc1234"]);
});
