import { expect } from "chai";

import CircleCI from "./circle.js";

describe("CircleCI", () => {
	it("applies if running in CircleCI", () => {
		const circleCi = new CircleCI({ CIRCLECI: "true" });

		expect(circleCi.applies()).to.equal(true);
	});

	it("does not apply if not running in CircleCI", () => {
		const circleCi = new CircleCI({});

		expect(circleCi.applies()).to.equal(false);
	});

	it("includes build number and link", () => {
		const circleCi = new CircleCI({
			CIRCLE_BUILD_NUM: "1234",
			CIRCLE_BUILD_URL: "https://example.com/build/1234",
		});

		expect(circleCi.lines()).to.deep.equal([
			{ content: "CircleCI build 1234", label: "In", name: "in" },
			{ content: "https://example.com/build/1234", label: "URL", name: "circleCiUrl", url: true },
		]);
	});
});
