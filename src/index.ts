export interface Clock {
	now(): Date;
}

export default class BuildInfo {

	constructor(private clock: Clock) {}

	async lines(): Promise<string[]> {
		return [
			`Built: ${this.timestamp()}`,
		];
	}

	private timestamp(): string {
		return this.clock.now().toISOString();
	}
}
