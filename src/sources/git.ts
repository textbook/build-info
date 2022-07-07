import { Cmd } from "./cmd.js";
import type { Source } from "../index.js";

export default class Git extends Cmd implements Source {

	async applies(): Promise<boolean> {
		try {
			await this.run("git status");
			return true;
		} catch (err) {
			return false;
		}
	}

	async lines(): Promise<string[]> {
		return [`From: ${await this.commit()}`, ...await this.changes()];
	}

	private async commit(): Promise<string> {
		const commit = await this.run("git show --no-patch  --format='%h %s'");
		return commit.trim();
	}

	private async changes(): Promise<string[]> {
		const stdout = await this.run("git status --porcelain");
		return stdout ? ["With changes:", ...stdout.trim().split("\n")] : [];
	}
}
