import assert from "node:assert/strict";
import { describe, it } from "node:test";

import Netlify from "./netlify.js";

describe("Netlify", () => {
	it("only applies if running in Netlify", () => {
		assert.equal(new Netlify({ NETLIFY: "true" }).applies(), true);
		assert.equal(new Netlify({}).applies(), false);
	});

	it("generates a header and deploy link", () => {
		const env = { BUILD_ID: "build-id", DEPLOY_ID: "deploy-id", SITE_NAME: "site-name" };
		assert.deepEqual(new Netlify(env).lines(), [
			"In: Netlify build build-id",
			"URL: https://app.netlify.com/sites/site-name/deploys/deploy-id",
		]);
	});
});
