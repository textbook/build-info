import assert from "node:assert/strict";
import { readFile, rm } from "node:fs/promises";
import { beforeEach, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import sinon, { type SinonStub } from "sinon";

import { ConsoleSink, FileSink, type Sink } from "./sinks.js";

type StubOf<T extends () => unknown> = SinonStub<Parameters<T>, ReturnType<T>>

describe("sinks", () => {
	describe("ConsoleSink", () => {
		it("writes data to the log", () => {
			const log: StubOf<Console["log"]> = sinon.stub();
			const sink: Sink = new ConsoleSink({ log });
			const data = "Hello, world!";

			sink.write(data);

			sinon.assert.calledOnceWithExactly(log, data);
		});
	});

	describe("FileSink", () => {
		const tempFile = fileURLToPath(new URL("out.txt", import.meta.url));

		beforeEach(async() => {
			await rm(tempFile, { force: true });
		});

		it("writes data to the specified file", async () => {
			const data = "Hello, world!";
			const sink: Sink = new FileSink(tempFile);

			await sink.write(data);

			assert.equal(await readFile(tempFile, { encoding: "utf-8" }), data);
		});
	});
});
