import assert from "node:assert/strict";
import { describe, it } from "node:test";

import Heroku from "./heroku.js";

describe("Heroku", () => {
	it("applies if running in Heroku", () => {
		const heroku = new Heroku({ SOURCE_VERSION: "abc1234" });

		assert.equal(heroku.applies(), true);
	});

	it("does not apply if not running in Heroku", () => {
		const heroku = new Heroku({});

		assert.equal(heroku.applies(), false);
	});

	it("exposes the source version", () => {
		const heroku = new Heroku({ SOURCE_VERSION: "abc1234" });

		assert.deepEqual(heroku.lines(), ["In: Heroku", "From: abc1234"]);
	});
});
