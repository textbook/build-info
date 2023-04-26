import { expect } from "chai";

import Netlify from "./netlify.js";

describe("Netlify", () => {
	it("only applies if running in Netlify", () => {
		expect(new Netlify({ NETLIFY: "true" }).applies()).to.equal(true);
		expect(new Netlify({}).applies()).to.equal(false);
	});

	it("generates a header and deploy link", () => {
		const env = { BUILD_ID: "build-id", DEPLOY_ID: "deploy-id", SITE_NAME: "site-name" };
		expect(new Netlify(env).lines()).to.deep.equal([
			"In: Netlify build build-id",
			"URL: https://app.netlify.com/sites/site-name/deploys/deploy-id",
		]);
	});
});
