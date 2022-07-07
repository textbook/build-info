import { Cmd } from "./cmd.js";
import type { Source } from "../index.js";

export default class User extends Cmd implements Source {
	async lines(): Promise<string[]> {
		const user = await this.run("whoami");
		return [`By: ${user.trim()}`];
	}
}
