export interface Source {
	lines(): string[] | Promise<string[]>;
}

export default class BuildInfo implements Source {

	constructor(private sources: Source[]) {}

	async lines(): Promise<string[]> {
		const lines = [];
		for (const source of this.sources) {
			lines.push(...await source.lines());
		}
		return lines;
	}
}
