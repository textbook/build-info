import { expect } from "chai";

import Heroku from "./heroku.js";

describe("Heroku", () => {
	it("applies if running in Heroku", () => {
		const heroku = new Heroku({ SOURCE_VERSION: "abc1234" });

		expect(heroku.applies()).to.equal(true);
	});

	it("does not apply if not running in Heroku", () => {
		const heroku = new Heroku({});

		expect(heroku.applies()).to.equal(false);
	});

	it("exposes the source version and stack", () => {
		const heroku = new Heroku({ SOURCE_VERSION: "abc1234", STACK: "heroku-22" });

		expect(heroku.lines()).to.deep.equal(["In: Heroku", "For: heroku-22", "From: abc1234"]);
	});
});
