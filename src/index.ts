import { CircleCI, Clock, Git, GitHubActions, Heroku, Netlify, Node, User } from "./sources/index.ts";

export interface Line {
	content: string;
	label: string;
	name: string;
	url?: boolean;
}

export interface Source {
	applies?(): boolean | Promise<boolean>;
	lines(): Line[] | Promise<Line[]>;
}

const ALL_SOURCES: Source[] = [
	new Clock(),
	new User(),
	new Git(),
	new Heroku(),
	new GitHubActions(),
	new CircleCI(),
	new Netlify(),
	new Node(),
];

export default class BuildInfo implements Source {
	private readonly sources: Source[];

	constructor(sources: Source[] = ALL_SOURCES) {
		this.sources = sources;
	}

	async lines(): Promise<Line[]> {
		return (
			await Promise.all(
				this.sources.map(async (source): Promise<Line[]> => {
					if (await source.applies?.() !== false) {
						return source.lines();
					}
					return [];
				}),
			)
		).flat();
	}
}
