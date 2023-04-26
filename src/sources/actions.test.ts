import { expect } from "chai";

import GitHubActions from "./actions.js";

describe("GitHub Actions", () => {
	it("does not apply if not running in GitHub Actions", () => {
		const actions = new GitHubActions({});
		expect(actions.applies()).to.equal(false);
	});

	it("applies if running in GitHub Actions", () => {
		const actions = new GitHubActions({ GITHUB_ACTIONS: "true" });
		expect(actions.applies()).to.equal(true);
	});

	it("includes build number and link", () => {
		const actions = new GitHubActions({
			GITHUB_ACTIONS: "true",
			GITHUB_REPOSITORY: "repo",
			GITHUB_RUN_NUMBER: "123",
			GITHUB_RUN_ID: "abc123",
			GITHUB_SERVER_URL: "https://example.com",
		});

		expect(actions.lines()).to.deep.equal([
			"In: GitHub Actions build 123",
			"URL: https://example.com/repo/actions/runs/abc123",
		]);
	});
});
