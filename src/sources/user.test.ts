import { expect } from "chai";
import sinon from "sinon";

import User from "./user.js";

describe("User", () => {
	it("returns the result from whoami", async () => {
		const run = sinon.stub().resolves("Jane Doe\n");

		const user = new User(run);

		expect(await user.lines()).to.deep.equal(["By: Jane Doe"]);
		sinon.assert.calledOnceWithExactly(run, "whoami");
	});
});
