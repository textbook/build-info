import { Source } from "../index.js";
import Env from "./env.js";

export default class CircleCI extends Env implements Source {
	applies(): boolean {
		return this.env.CIRCLECI === "true";
	}

	lines(): string[] {
		return [
			`In: CircleCI build ${this.env.CIRCLE_BUILD_NUM}`,
			`URL: ${this.env.CIRCLE_BUILD_URL}`,
		];
	}
}
