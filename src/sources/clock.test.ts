import assert from "node:assert/strict";
import { describe, it } from "node:test";

import Clock from "./clock.js";

describe("Clock", () => {
	it("returns the time in ISO format", async () => {
		const clock = new Clock(() => new Date(Date.UTC(2022, 0, 2, 3, 4, 5, 678)));
		assert.deepEqual(clock.lines(), ["Built: 2022-01-02T03:04:05.678Z"]);
	});
});
