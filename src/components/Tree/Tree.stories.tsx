import type { Meta, StoryObj } from '@storybook/html';

import { Tree } from './Tree';
import { TreeProvider } from '~/components/TreeProvider/TreeProvider';
import { Item } from '~/lib/Item';
import uniqid from 'uniqid';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';
import { rootId } from '~/lib/itemUtils';
import { setIsPrinting } from '~/lib/isPrinting';

function file(name: string, isCollapsed: boolean = false, parentId?: string): Partial<Item> {
	return {
		id: uniqid.time(),
		name,
		itemType: 'file',
		isCollapsed,
		parentId,
		level: 1,
	};
}

function directory(
	name: string,
	isCollapsed: boolean = false,
	parentId?: string,
	customId?: string,
): {
	children: (
		items: (ReturnType<typeof directory> | ReturnType<typeof file>)[],
	) => ReturnType<typeof directory>;
	toItems: () => Record<string, Item>;
	items: Partial<Item>[];
} {
	const id = customId ?? uniqid.time();

	const thisItem: Partial<Item> = {
		id,
		name,
		itemType: 'directory',
		isCollapsed,
		parentId,
		level: 1,
	};

	const itemsToReturn = [thisItem];

	return {
		items: itemsToReturn,
		toItems() {
			return this.items.reduce(
				(acc, value) => ({ ...acc, [value.id as string]: value as Item }),
				{} as Record<string, Item>,
			);
		},
		children(items: (ReturnType<typeof directory> | ReturnType<typeof file>)[]) {
			items.forEach((item) => {
				if ('items' in item) {
					item.items[0].parentId = id;
					item.items.forEach((item) => ((item.level as number) += 1));
					itemsToReturn.push(...item.items);
				} else {
					item.parentId = id;
					(item.level as number) += 1;
					itemsToReturn.push(item);
				}
			});
			return this;
		},
	};
}

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
