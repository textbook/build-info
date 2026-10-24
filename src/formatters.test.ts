import { expect } from "chai";
import { JSDOM } from "jsdom";

import type { Format, Formatter } from "./formatters.ts";
import { FORMATTERS, getFormatter } from "./formatters.ts";

describe("formatters", () => {
	describe("getFormatter", () => {
		interface TestCase {
			format: Format;
			options: Parameters<typeof getFormatter>[0];
			title: string;
		}

		// eslint-disable-next-line mocha/no-setup-in-suite -- parameterised test
		([
			{ title: "defaults to text", format: "text", options: {} },
			{ title: "uses json for .json files", format: "json", options: { output: "out.json" } },
			{ title: "uses html for .htm files", format: "html", options: { output: "out.htm" } },
			{ title: "uses html for .html files", format: "html", options: { output: "out.html" } },
			{ title: "uses text for .txt files", format: "text", options: { output: "out.txt" } },
			{ title: "uses text for .csv files", format: "text", options: { output: "out.csv" } },
			{ title: "allows explicit override", format: "json", options: { format: "json", output: "out.csv" } },
		] as const satisfies readonly TestCase[]).forEach(({ format, options, title }) => {
			it(title, () => {
				expect(getFormatter(options)).to.be.instanceof(FORMATTERS[format]);
			});
		});
	});

	describe("HtmlFormatter", () => {
		it("renders the data as a simple table", () => {
			const formatter: Formatter = new FORMATTERS.html();
			const formatted = formatter.format([
				{ content: "hello", label: "Foo", name: "foo" },
				{ content: "https://example.com", label: "Bar", name: "bar", url: true },
			]);
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
