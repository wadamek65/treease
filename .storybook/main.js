import * as path from 'node:path';
const { mergeConfig } = require('vite');
const tsconfigPaths = require('vite-tsconfig-paths').default;

/** @type { import('storybook-solidjs-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
	],
	framework: {
		name: 'storybook-solidjs-vite',
		options: {},
	},
	async viteFinal(config) {
		config.plugins.push(
			tsconfigPaths({
				projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
			}),
		);
		return mergeConfig(config, {
			define: {
				'process.env.NODE_DEBUG': false,
			},
		});
	},
};

export default config;
