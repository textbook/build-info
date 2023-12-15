import Env from "./env.js";
import type { Source } from "../index.js";

export default class GitHubActions extends Env implements Source {

	applies(): boolean {
		return !!this.env.GITHUB_ACTIONS;
	}

	lines(): string[] {
		return [
			`In: GitHub Actions build ${this.env.GITHUB_RUN_NUMBER}`,
			`URL: ${this.url()}`,
		];
	}

	private url(): string {
		return `${this.env.GITHUB_SERVER_URL}/${this.env.GITHUB_REPOSITORY}/actions/runs/${this.env.GITHUB_RUN_ID}`;
	}
}
