import assert from "node:assert/strict";
import test from "node:test";

import GitHubActions from "./actions.js";

test("does not apply if not running in GitHub Actions", () => {
	const actions = new GitHubActions({});
	assert.equal(actions.applies(), false);
});

test("applies if running in GitHub Actions", () => {
	const actions = new GitHubActions({ GITHUB_ACTIONS: "true" });
	assert.equal(actions.applies(), true);
});

test("includes build number and link", () => {
	const actions = new GitHubActions({
		GITHUB_ACTIONS: "true",
		GITHUB_REPOSITORY: "repo",
		GITHUB_RUN_NUMBER: "123",
		GITHUB_RUN_ID: "abc123",
		GITHUB_SERVER_URL: "https://example.com",
	});

	assert.deepEqual(actions.lines(), [
		"In: GitHub Actions build 123",
		"URL: https://example.com/repo/actions/runs/abc123",
	]);
});
