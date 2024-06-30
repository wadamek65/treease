import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import solid from 'eslint-plugin-solid/configs/typescript.js';
import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		...solid,
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: 'tsconfig.json',
			},
		},
	},
];
