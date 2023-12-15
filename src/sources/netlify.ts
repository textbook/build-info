import Env from "./env.js";
import type { Source } from "../index.js";

export default class Netlify extends Env implements Source {

	applies(): boolean {
		return this.env.NETLIFY === "true";
	}

	lines(): string[] {
		return [
			`In: Netlify build ${this.env.BUILD_ID}`,
			`URL: https://app.netlify.com/sites/${this.env.SITE_NAME}/deploys/${this.env.DEPLOY_ID}`,
		];
	}
}
