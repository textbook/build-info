import type { Line, Source } from "../index.js";

export default class Clock implements Source {

	constructor(private now: () => Date = (): Date => new Date()) {}

	lines(): Line[] {
		return [
			{ content: this.timestamp(), label: "Built", name: "built" },
		];
	}

	private timestamp(): string {
		return this.now().toISOString();
	}
}
