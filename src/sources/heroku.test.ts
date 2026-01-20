import { expect } from "chai";

import Heroku from "./heroku.ts";

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

		expect(heroku.lines()).to.deep.equal([
			{ content: "Heroku", label: "In", name: "in" },
			{ content: "heroku-22", label: "For", name: "for" },
			{ content: "abc1234", label: "From", name: "from" },
		]);
	});
});
