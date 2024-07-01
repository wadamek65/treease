import type { Meta, StoryObj } from '@storybook/html';
import { ExtensionIcon } from '~/components/ExtensionIcon/ExtensionIcon';

const meta = {
	component: (props) => <ExtensionIcon class="size-16" {...props} />,
	argTypes: {
		itemType: {
			control: 'select',
			options: ['file', 'directory'],
		},
		fileName: {
			control: 'text',
		},
	},
	args: {
		itemType: 'file',
		fileName: 'file',
	},
} as Meta<typeof ExtensionIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const File: Story = {
	args: {},
};

export const UnknownExtension: Story = {
	args: {
		fileName: 'file.unknown',
	},
};

export const Directory: Story = {
	args: {
		itemType: 'directory',
		fileName: 'dir',
	},
};

export const DirectoryWithExtension: Story = {
	args: {
		itemType: 'directory',
		fileName: 'dir.txt',
	},
};

export const Txt: Story = {
	args: {
		fileName: 'file.txt',
	},
};

export const Js: Story = {
	args: {
		fileName: 'file.js',
	},
};
