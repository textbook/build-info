import cyfConfig from "@codeyourfuture/eslint-config-standard";
import commentsPlugin from "eslint-plugin-eslint-comments";
import mochaPlugin from "eslint-plugin-mocha";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		ignores: ["lib/"],
	},
	...cyfConfig.configs.standard,
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
			"@typescript-eslint/prefer-readonly": "error",
			"eslint-comments/no-unused-disable": "error",
			"eslint-comments/require-description": "error",
			"no-extra-parens": "error",
		},
	},
	{
		files: ["**/*.js"],
		...tseslint.configs.disableTypeChecked,
	},
	{
		files: ["src/**/*.test.ts"],
		...mochaPlugin.configs.all,
		rules: {
			...mochaPlugin.configs.all.rules,
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"mocha/no-mocha-arrows": "off",
			"mocha/no-synchronous-tests": "off",
			"mocha/valid-test-title": "off",
		},
	},
];
