import type { ExecException } from "node:child_process";

export type ProcessException = ExecException & { stderr?: string; stdout?: string };

export function createError(overrides: Omit<ProcessException, keyof Error>): ProcessException {
	return Object.assign(
		new Error("error"),
		{ cmd: "", code: 1, killed: false, stderr: "", stdout: "", ...overrides },
	);
}
