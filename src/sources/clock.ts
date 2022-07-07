import type { Source } from "../index.js";

export default class Clock implements Source {

	constructor(private now: () => Date = (): Date => new Date()) {}

	lines(): string[] {
		return [`Built: ${this.timestamp()}`];
	}

	private timestamp(): string {
		return this.now().toISOString();
	}
}
