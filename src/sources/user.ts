import type { Line, Source } from "../index.js";

import { Cmd } from "./cmd.js";

export default class User extends Cmd implements Source {
	async lines(): Promise<Line[]> {
		const user = await this.run("whoami");
		return [{ content: user.trim(), label: "By", name: "by" }];
	}
}
