import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface PackageFile {
	version: string;
}

export async function getPackageFile(): Promise<PackageFile> {
	const content = await readFile(join(__dirname, "..", "package.json"), "utf8");
	return JSON.parse(content) as PackageFile;
}

export async function getPackageProperty(key: keyof PackageFile): Promise<PackageFile[typeof key]> {
	const packageFile = await getPackageFile();
	return packageFile[key];
}
