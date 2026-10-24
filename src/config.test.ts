import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { expect } from "chai";

import getConfig from "./config.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

		it("allows paths within the working directory", () => {
			[`${__dirname}/bar.txt`, `${__dirname}/../baz.txt`].forEach((path) => {
				expect(() => getConfig(["--output", path])).not.to.throw();
			});
		});

		it("rejects paths outside the working directory", () => {
			["/foo/bar/baz.txt", `${__dirname}/../../foo.html`].forEach((path) => {
				expect(() => getConfig(["--output", path])).to.throw(
					"'--output' must be within the working directory",
				);
			});
		});

		// eslint-disable-next-line mocha/no-setup-in-suite -- conditional test
		(process.platform === "win32" ? it : it.skip)("rejects other drives", () => {
			expect(() => getConfig(["--output", "X:\\some\\dir"])).to.throw(
				"'--output' must be within the working directory",
			);
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
			const options = getConfig(["-f", "json", "-f", "text"]);
			expect(options.format).to.equal("text");
		});

		it("handles the option not being provided at all", () => {
			const options = getConfig([]);
			expect(options.format).to.be.undefined;
		});
	});

	it("rejects unknown options", () => {
		expect(() => getConfig(["--some", "other"])).to.throw(
			"Unknown option '--some'",
		);
	});

	it("rejects positional arguments", () => {
		expect(() => getConfig(["some", "other"])).to.throw(
			"Unexpected argument 'some'",
		);
	});
});
