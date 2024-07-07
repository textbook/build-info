import { expect } from "chai";

import BuildInfo, { Line } from "./index.js";

const bar: Line = { content: "bar", label: "bar", name: "bar" };
const foo: Line = { content: "foo", label: "foo", name: "foo" };

describe("BuildInfo", () => {
	it("includes all source lines", async () => {
		const buildInfo = new BuildInfo([
			{ lines: () => [foo] },
			{ lines: () => Promise.resolve([bar]) },
		]);

		expect(await buildInfo.lines()).to.deep.equal([foo, bar]);
	});

	it("excludes sources that don't apply", async () => {
		const buildInfo = new BuildInfo([
			{ applies: () => true, lines: () => [foo] },
			{ applies: () => false, lines: () => Promise.resolve([bar]) },
		]);

		expect(await buildInfo.lines()).to.deep.equal([foo]);
	});
});
