import type { Line, Source } from "../index.ts";
import { Cmd } from "./cmd.ts";

export default class Git extends Cmd implements Source {
	async applies(): Promise<boolean> {
		try {
			await this.version();
			return true;
		} catch {
			return false;
		}
	}

	async lines(): Promise<Line[]> {
		return [
			{ content: await this.version(), label: "Using Node", name: "node" },
		];
	}

	private async version(): Promise<string> {
		const version = await this.run("node --version");
		return version.trim();
	}
}
