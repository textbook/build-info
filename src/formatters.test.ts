import { expect } from "chai";
import { JSDOM } from "jsdom";

import { Formatter, FORMATTERS } from "./formatters.js";

describe("formatters", () => {
	describe("HtmlFormatter", () => {
		it("renders the data as a simple table", () => {
			const formatter: Formatter = new FORMATTERS.html();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "https://example.com", label: "Bar", name: "bar", url: true },
			]);
			console.log(formatted);
			const dom = new JSDOM(formatted);
			expect(dom.window.document.querySelector("h1")!.textContent).to.equal("Build Info");
			const table = [...dom.window.document.querySelectorAll("table > tbody > tr")]
				.map((row) => [...row.querySelectorAll("td,th")].map((cell) => cell?.textContent));
			expect(table).to.deep.equal([["Foo", "hello"], ["Bar", "https://example.com"]]);
			expect(dom.window.document.querySelector("a")!.getAttribute("href")).to.equal("https://example.com");
		});
	});

	describe("JsonFormatter", () => {
		it("combines lines into a single JSON string", () => {
			const formatter: Formatter = new FORMATTERS.json();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "world", label: "Bar", name: "bar" },
			]);
			expect(JSON.parse(formatted)).to.deep.equal({ foo: "hello", bar: "world" });
		});
	});

	describe("TextFormatter", () => {
		it("creates a simple text format", () => {
			const formatter: Formatter = new FORMATTERS.text();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "world", label: "Bar", name: "bar" },
			]);
			expect(formatted).to.equal("Foo: hello\nBar: world");
		});
	});
});
