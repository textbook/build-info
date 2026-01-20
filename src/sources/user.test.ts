import { expect } from "chai";
import sinon from "sinon";

import User from "./user.ts";

describe("User", () => {
	it("returns the result from whoami", async () => {
		const run = sinon.stub().resolves("Jane Doe\n");

		const user = new User(run);

		expect(await user.lines()).to.deep.equal([
			{ content: "Jane Doe", label: "By", name: "by" },
		]);
		sinon.assert.calledOnceWithExactly(run, "whoami");
	});
});
