import Env from "./env.js";
import type { Source } from "../index.js";

export default class Heroku extends Env implements Source {

	applies(): boolean {
		return !!this.env["SOURCE_VERSION"];
	}

	lines(): string[] {
		return ["In: Heroku", `For: ${this.env["STACK"]}`, `From: ${this.env["SOURCE_VERSION"]}`];
	}
}
