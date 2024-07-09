import { expect } from "chai";

import getConfig from "./config.js";

describe("config", () => {
	describe("--output", () => {
		it("extracts the configured value", () => {
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
	});

	describe("--format", () => {
		it("extracts the configured value", () => {
			const options = getConfig(["--format", "json"]);
			expect(options.format).to.equal("json");
		});

		it("can use a shorthand form", () => {
			const options = getConfig(["-f", "json"]);
			expect(options.format).to.equal("json");
		});

		it("only includes a single value", () => {
			const options = getConfig(["-o", "json", "-o", "text"]);
			expect(options.output).to.equal("text");
		});

		it("handles the option not being provided at all", () => {
			const options = getConfig([]);
			expect(options.format).to.equal("text");
		});

		it("rejects unknown values", () => {
			expect(() => getConfig(["--format", "banana"])).to.throw('Invalid format "banana"');
		});
	});

	it("rejects unknown options", () => {
		expect(() => getConfig(["--some", "other"])).to.throw("Unknown option '--some'");
	});

	it("rejects positional arguments", () => {
		expect(() => getConfig(["some", "other"])).to.throw("Unexpected argument 'some'");
	});
});
