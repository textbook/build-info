import assert from "node:assert/strict";
import { describe, it } from "node:test";

import getConfig from "./config.js";

describe("config", () => {
	it("extracts the configured output file", () => {
		const options = getConfig(["--output", "foo.txt"]);
		assert.equal(options.output, "foo.txt");
	});

	it("can use a shorthand form", () => {
		const options = getConfig(["-o", "foo.txt"]);
		assert.equal(options.output, "foo.txt");
	});

	it("only includes a single value", () => {
		const options = getConfig(["-o", "foo.txt", "-o", "bar.txt"]);
		assert.equal(options.output, "bar.txt");
	});
});
