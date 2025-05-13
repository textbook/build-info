import type { Line, Source } from "../index.js";

import Env from "./env.js";

export default class GitHubActions extends Env implements Source {
	applies(): boolean {
		return !!this.env.GITHUB_ACTIONS;
	}

	lines(): Line[] {
		return [
			{ content: `GitHub Actions build ${this.env.GITHUB_RUN_NUMBER}`, label: "In", name: "in" },
			{ content: this.url(), label: "URL", name: "githubActionsUrl", url: true },
		];
	}

	private url(): string {
		return `${this.env.GITHUB_SERVER_URL}/${this.env.GITHUB_REPOSITORY}/actions/runs/${this.env.GITHUB_RUN_ID}`;
	}
}
