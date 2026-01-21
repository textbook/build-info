import { expect } from "chai";
import { JSDOM } from "jsdom";
import type { EmitFile, EmittedAsset, PluginContext } from "rollup";
import sinon, { type SinonStub } from "sinon";

import buildInfo from "./rollup.ts";

type StubOf<T extends (...args: never[]) => unknown> = SinonStub<Parameters<T>, ReturnType<T>>;

describe("Rollup plugin", () => {
	it("exposes the package name and version", () => {
		const plugin = buildInfo({ filename: "" });
		expect(plugin).to.have.property("name", process.env.npm_package_name);
		expect(plugin).to.have.property("version", process.env.npm_package_version);
	});

	it("emits an asset", async () => {
		const ctx = createTestContext();
		const filename = "file.name";
		const plugin = buildInfo({ filename });
		await plugin.buildEnd.call(ctx.context);
		const asset = ctx.getAsset();
		expect(asset).to.have.property("type", "asset");
		expect(asset).to.have.property("fileName", filename);
	});

	it("generates text format by default", async () => {
		const ctx = createTestContext();
		const plugin = buildInfo({ filename: "test.txt" });
		await plugin.buildEnd.call(ctx.context);
		expect(ctx.getSource()).to.contain("Built: ");
	});

	it("generates JSON format when .json extension is supplied", async () => {
		const ctx = createTestContext();
		const plugin = buildInfo({ filename: "test.json" });
		await plugin.buildEnd.call(ctx.context);
		expect(JSON.parse(ctx.getSource())).to.have.property("built");
	});

	it("generates HTML format when .html extension is supplied", async () => {
		const ctx = createTestContext();
		const plugin = buildInfo({ filename: "test.html" });
		await plugin.buildEnd.call(ctx.context);
		const dom = new JSDOM(ctx.getSource());
		expect(dom.window.document.querySelector("h1")!.textContent).to.equal("Build Info");
	});

	it("allows explicitly setting the output format", async () => {
		const ctx = createTestContext();
		const plugin = buildInfo({ filename: "test.html", format: "json" });
		await plugin.buildEnd.call(ctx.context);
		expect(JSON.parse(ctx.getSource())).to.have.property("built");
	});

	it("does not run on serve", () => {
		const plugin = buildInfo({ filename: "test.txt" });
		expect(plugin.apply).to.equal("build");
	});

	it("does not emit file on error", async () => {
		const plugin = buildInfo({ filename: "test.txt" });
		const ctx = createTestContext();
		await plugin.buildEnd.call(ctx.context, new Error("oh no!"));
		expect(ctx.emitFile.callCount).to.equal(0);
	});
});

function createTestContext() {
	const emitFile: StubOf<EmitFile> = sinon.stub();
	function getAsset() {
		return emitFile.lastCall.args[0] as EmittedAsset;
	}
	return {
		context: { emitFile: emitFile as EmitFile } as PluginContext,
		emitFile,
		getAsset,
		getSource() {
			const asset = getAsset();
			return asset.source!.toString();
		},
	};
}
