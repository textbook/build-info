export interface Source {
	applies?(): boolean | Promise<boolean>;
	lines(): string[] | Promise<string[]>;
}

export default class BuildInfo implements Source {

	constructor(private sources: Source[]) {}

	async lines(): Promise<string[]> {
		const lines = [];
		for (const source of this.sources) {
			if (await source.applies?.() !== false) {
				lines.push(...await source.lines());
			}
		}
		return lines;
	}
}
