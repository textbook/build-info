import type { Line, Source } from "../index.ts";

export default class Clock implements Source {
	private readonly now: () => Date;

	constructor(now: () => Date = (): Date => new Date()) {
		this.now = now;
	}

	lines(): Line[] {
		return [
			{ content: this.timestamp(), label: "Built", name: "built" },
		];
	}

	private timestamp(): string {
		return this.now().toISOString();
	}
}
