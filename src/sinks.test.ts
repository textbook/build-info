import { readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { expect } from "chai";
import sinon, { type SinonStub } from "sinon";

import { ConsoleSink, FileSink, type Sink } from "./sinks.js";

type StubOf<T extends () => unknown> = SinonStub<Parameters<T>, ReturnType<T>>

describe("sinks", () => {
	describe("ConsoleSink", () => {
		it("writes data to the log", async () => {
			const log: StubOf<Console["log"]> = sinon.stub();
			const sink: Sink = new ConsoleSink({ log });
			const data = "Hello, world!";

			await sink.write(data);

			sinon.assert.calledOnceWithExactly(log, data);
		});
	});

	describe("FileSink", () => {
		it("writes data to the specified file", async () => {
			const tempFile = fileURLToPath(new URL("out.txt", import.meta.url));
			await rm(tempFile, { force: true });
			const data = "Hello, world!";
			const sink: Sink = new FileSink(tempFile);

			await sink.write(data);

			expect(await readFile(tempFile, { encoding: "utf-8" })).to.deep.equal(data);
		});
	});
});
