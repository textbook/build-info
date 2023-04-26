import { CircleCI, Clock, Git, GitHubActions, Heroku, Netlify, User } from "./sources/index.js";

export interface Source {
	applies?(): boolean | Promise<boolean>;
	lines(): string[] | Promise<string[]>;
}

const ALL_SOURCES: Source[] = [
	new Clock(),
	new User(),
	new Git(),
	new Heroku(),
	new GitHubActions(),
	new CircleCI(),
	new Netlify(),
];

export default class BuildInfo implements Source {

	constructor(private sources: Source[] = ALL_SOURCES) {}

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
