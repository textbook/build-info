export interface Clock {
	now(): Date;
}

export interface Git {
	changes(): Promise<string[]>;
}

export default class BuildInfo {

	constructor(
		private clock: Clock,
		private git: Git,
	) {}

	async lines(): Promise<string[]> {
		return [
			`Built: ${this.timestamp()}`,
			...await this.gitChanges(),
		];
	}

	private async gitChanges(): Promise<string[]> {
		const changes = await this.git.changes();
		if (changes.length > 0) {
			return ["With changes:", ...changes];
		}
		return [];
	}

	private timestamp(): string {
		return this.clock.now().toISOString();
	}
}
