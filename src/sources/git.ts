import type { Line, Source } from "../index.ts";

import { Cmd } from "./cmd.ts";

export default class Git extends Cmd implements Source {
	async applies(): Promise<boolean> {
		try {
			await this.run("git status");
			return true;
		} catch {
			return false;
		}
	}

	async lines(): Promise<Line[]> {
		return [
			{ content: await this.commit(), label: "From", name: "from" },
			...await this.changes(),
		];
	}

	private async commit(): Promise<string> {
		const commit = await this.run('git show --no-patch --format="%h %s"');
		return commit.trim();
	}

	private async changes(): Promise<Line[]> {
		const stdout = await this.run("git status --porcelain");
		return stdout
			? [{ content: stdout.trimEnd(), label: "With changes", name: "changes" }]
			: [];
	}
}
