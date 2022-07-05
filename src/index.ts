export interface Clock {
	now(): Date;
}

export default class BuildInfo {

	constructor(private clock: Clock) {}

	lines(): string[] {
		return [
			`Built: ${this.clock.now().toISOString()}`,
		];
	}
}
