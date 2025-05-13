import type { Line, Source } from "../index.js";

import Env from "./env.js";

export default class Netlify extends Env implements Source {
	applies(): boolean {
		return this.env.NETLIFY === "true";
	}

	lines(): Line[] {
		return [
			{ content: `Netlify build ${this.env.BUILD_ID}`, label: "In", name: "in" },
			{
				content: `https://app.netlify.com/sites/${this.env.SITE_NAME}/deploys/${this.env.DEPLOY_ID}`,
				label: "URL",
				name: "netlifyUrl",
				url: true,
			},
		];
	}
}
