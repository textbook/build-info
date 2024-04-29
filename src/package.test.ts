import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect } from "chai";

import { getPackageFile, getPackageProperty } from "./package.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "package.fixture.json");

describe("package file handling", () => {
	describe("getPackageFile", () => {
		it("exposes the whole file", async () => {
			expect(await getPackageFile(fixturePath)).to.deep.equal({ name: "fake-package", version: "1.2.3" });
		});

		it("finds the root package.json by default", async () => {
			expect(await getPackageFile()).to.have.property("name", "@textbook/build-info");
		});
	});

	describe("getPackageProperty", () => {
		it("exposes the specified property", async () => {
			expect(await getPackageProperty("version", fixturePath)).to.equal("1.2.3");
		});

		it("is undefined for unexpected properties", async () => {
			// @ts-expect-error -- should reject unknown names
			expect(await getPackageProperty("something", fixturePath)).to.be.undefined;
		});

		it("finds the root package.json by default", async () => {
			expect(await getPackageProperty("name")).to.equal("@textbook/build-info");
		});
	});
});
