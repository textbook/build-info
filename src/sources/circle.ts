import type { Line, Source } from "../index.ts";

import Env from "./env.ts";

export default class CircleCI extends Env implements Source {
	applies(): boolean {
		return this.env.CIRCLECI === "true";
	}

	lines(): Line[] {
		return [
			{ content: `CircleCI build ${this.env.CIRCLE_BUILD_NUM}`, label: "In", name: "in" },
			{ content: `${this.env.CIRCLE_BUILD_URL}`, label: "URL", name: "circleCiUrl", url: true },
		];
	}
}
