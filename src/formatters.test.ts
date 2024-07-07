import { expect } from "chai";

import { Formatter, JsonFormatter, TextFormatter } from "./formatters.js";

describe("formatters", () => {
	describe("JsonFormatter", () => {
		it("combines lines into a single JSON string", () => {
			const formatter: Formatter = new JsonFormatter();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "world", label: "Bar", name: "bar" },
			]);
			expect(JSON.parse(formatted)).to.deep.equal({ foo: "hello", bar: "world" });
		});
	});

	describe("TextFormatter", () => {
		it("creates a simple text format", () => {
			const formatter: Formatter = new TextFormatter();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "world", label: "Bar", name: "bar" },
			]);
			expect(formatted).to.equal("Foo: hello\nBar: world");
		});
	});
});
