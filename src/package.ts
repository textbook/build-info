import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagePath = join(__dirname, "..", "package.json");

interface PackageFile {
	name: string;
	version: string;
}

export async function getPackageFile(path: string = packagePath): Promise<PackageFile> {
	const content = await readFile(path, "utf8");
	return JSON.parse(content) as PackageFile;
}

export async function getPackageProperty(key: keyof PackageFile, path: string = packagePath): Promise<PackageFile[typeof key]> {
	const packageFile = await getPackageFile(path);
	return packageFile[key];
}
