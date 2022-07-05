import { Clock } from "./clock";

export default class BuildInfo {

	constructor(private clock: Clock) {}

	lines(): string[] {
		return [
			`Built: ${this.clock.now().toISOString()}`,
		];
	}
}
