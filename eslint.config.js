// eslint-disable-next-line eslint-comments/disable-enable-pair -- disabling rules for the whole file
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access -- ignore untyped values */
import cyfConfig from "@codeyourfuture/eslint-config-standard";
import commentsPlugin from "eslint-plugin-eslint-comments";
import mochaPlugin from "eslint-plugin-mocha";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
	{
		ignores: ["lib/"],
	},
	cyfConfig,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			"eslint-comments": commentsPlugin,
		},
		rules: {
			...commentsPlugin.configs.recommended.rules,
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/no-non-null-assertion": "error",
			"eslint-comments/no-unused-disable": "error",
			"eslint-comments/require-description": "error",
			"indent": ["error", "tab", { "SwitchCase": 1 }],
			"no-extra-parens": "error",
		},
	},
	{
		files: ["src/**/*.test.ts"],
		...mochaPlugin.configs.flat.all,
		rules: {
			...mochaPlugin.configs.flat.all.rules,
			"@typescript-eslint/explicit-function-return-type": "off",
			"mocha/no-mocha-arrows": "off",
			"mocha/no-synchronous-tests": "off",
			"mocha/valid-test-description": "off",
		},
	},
];
