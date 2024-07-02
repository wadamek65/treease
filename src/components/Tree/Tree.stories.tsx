import type { Meta, StoryObj } from '@storybook/html';

import { Tree } from './Tree';
import { TreeProvider } from '~/components/TreeProvider/TreeProvider';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';
import { rootId } from '~/lib/itemUtils';
import { directory, file } from '~/lib/testUtils';

const meta = {
	component: () => <Tree />,
	decorators: [
		(Story, { parameters }) => (
			<DragDropProvider>
				<DragDropSensors>
					<TreeProvider initialValue={parameters.initialValue}>
						<Story />
					</TreeProvider>
				</DragDropSensors>
			</DragDropProvider>
		),
	],
} as Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	parameters: {
		initialValue: {
			items: directory('/root', false, '', rootId)
				.children([
					directory('dir1', false, rootId).children([
						file('file1.txt'),
						file('file2.txt'),
						directory('dir2').children([file('file3.txt')]),
					]),
				])
				.toItems(),
		},
		isPrinting: false,
	},
};

export const Sorting: Story = {
	parameters: {
		initialValue: {
			items: directory('/root', false, '', rootId)
				.children([
					directory('a_dir', false, rootId).children([
						file('a_file.txt'),
						directory('a_dir').children([file('file.txt')]),
						file('c_file.txt'),
						directory('b_dir').children([file('file.txt')]),
						file('b_file.txt'),
					]),
				])
				.toItems(),
			isPrinting: false,
		},
	},
};

export const Collapsed: Story = {
	parameters: {
		initialValue: {
			items: directory('/root', false, '', rootId)
				.children([
					directory('a_dir', true, rootId).children([
						file('a_file.txt'),
						file('c_file.txt'),
						file('b_file.txt'),
					]),
				])
				.toItems(),
			isPrinting: false,
		},
	},
};

export const PrintMode: Story = {
	parameters: {
		initialValue: {
			items: directory('/root', false, '', rootId)
				.children([
					directory('dir1', false, rootId).children([
						file('file1.txt'),
						file('file2.txt'),
						directory('dir2').children([file('file3.txt')]),
					]),
				])
				.toItems(),
			isPrinting: true,
		},
	},
};
