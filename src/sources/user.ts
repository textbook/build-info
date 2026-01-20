import type { Line, Source } from "../index.ts";

import { Cmd } from "./cmd.ts";

export default class User extends Cmd implements Source {
	async lines(): Promise<Line[]> {
		const user = await this.run("whoami");
		return [{ content: user.trim(), label: "By", name: "by" }];
	}
}
