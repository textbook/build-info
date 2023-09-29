import { expect } from "chai";

import getConfig from "./config.js";

describe("config", () => {
	it("extracts the configured output file", () => {
		const options = getConfig(["--output", "foo.txt"]);
		expect(options.output).to.equal("foo.txt");
	});

	it("can use a shorthand form", () => {
		const options = getConfig(["-o", "foo.txt"]);
		expect(options.output).to.equal("foo.txt");
	});

	it("only includes a single value", () => {
		const options = getConfig(["-o", "foo.txt", "-o", "bar.txt"]);
		expect(options.output).to.equal("bar.txt");
	});

	it("handles the option not being provided at all", () => {
		const options = getConfig([]);
		expect(options.output).to.be.undefined;
	});

	it("rejects unknown options", () => {
		expect(() => getConfig(["--some", "other"])).to.throw("Unknown option '--some'");
	});
});
