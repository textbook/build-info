import Env from "./env.js";
import type { Source } from "./index.js";

export default class Heroku extends Env implements Source {

	lines(): string[] {
		return [`From: ${this.env.SOURCE_VERSION}`];
	}

	applies(): boolean {
		return this.env.SOURCE_VERSION !== undefined;
	}
}
