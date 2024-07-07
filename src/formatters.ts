import { Line } from "./index.js";

export interface Formatter {
  format(data: Line[]): string;
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
	json: JsonFormatter,
	text: TextFormatter,
} satisfies Record<string, new() => Formatter>;

export type Format = keyof typeof FORMATTERS;
