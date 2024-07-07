import type { Line, Source } from "../index.js";

import Env from "./env.js";

export default class Heroku extends Env implements Source {

	applies(): boolean {
		return !!this.env.SOURCE_VERSION;
	}

	lines(): Line[] {
		return [
			{ content: "Heroku", label: "In", name: "in" },
			{ content: `${this.env.STACK}`, label: "For", name: "for" },
			{ content: `${this.env.SOURCE_VERSION}`, label: "From", name: "from" },
		];
	}
}
