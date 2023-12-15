import { expect } from "chai";

import Clock from "./clock.js";

describe("Clock", () => {
	it("returns the time in ISO format", () => {
		const clock = new Clock(() => new Date(Date.UTC(2022, 0, 2, 3, 4, 5, 678)));
		expect(clock.lines()).to.deep.equal(["Built: 2022-01-02T03:04:05.678Z"]);
	});
});
