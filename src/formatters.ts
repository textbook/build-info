import { parse } from "node:path";

import { type Line } from "./index.ts";

export interface Formatter {
	format(data: Line[]): string;
}

export class HtmlFormatter implements Formatter {
	format(data: Line[]): string {
		return [
			"<!DOCTYPE html><html lang=\"en\">",
			"<head><meta charset=\"UTF-8\"><title>Build Info</title></head>",
			"<body><h1>Build Info</h1>",
			"<table><tbody>",
			...data.map(({ content, label, url }) => {
				const value = url ? `<a href="${content}">${content}</a>` : this.multiline(content);
				return `<tr><th>${this.multiline(label)}</th><td>${value}</td></tr>`;
			}),
			"</tbody></table>",
			"</body></html>",
		].join("");
	}

	private multiline(value: string): string {
		return value.replaceAll("\n", "<br>");
	}
}

export class JsonFormatter implements Formatter {
	format(data: Line[]): string {
		const summary = data.reduce((result, entry) => {
			result[entry.name] = entry.content;
			return result;
		}, {} as Record<string, string>);
		return JSON.stringify(summary, null, 2);
	}
}

export class TextFormatter implements Formatter {
	format(data: Line[]): string {
		return data.map((entry) => `${entry.label}: ${entry.content}`).join("\n");
	}
}

export const FORMATTERS = {
	html: HtmlFormatter,
	json: JsonFormatter,
	text: TextFormatter,
} satisfies Record<string, new() => Formatter>;

export type Format = keyof typeof FORMATTERS;

function getFormat(filename?: string): Format {
	if (filename) {
		switch (parse(filename).ext) {
			case ".json":
				return "json";
			case ".htm":
			case ".html":
				return "html";
		}
	}
	return "text";
}

export function getFormatter({ format, output }: { format?: string; output?: string }): Formatter {
	validateFormat(format);
	return new FORMATTERS[format ?? getFormat(output)]();
}

function validateFormat(format: string | undefined): asserts format is Format | undefined {
	if (format && !(format in FORMATTERS)) {
		throw new Error(`Invalid format ${JSON.stringify(format)}`);
	}
}
