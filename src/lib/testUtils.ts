import { Item } from '~/lib/Item';
import uniqid from 'uniqid';

export function file(name: string, isCollapsed: boolean = false, parentId?: string): Partial<Item> {
	return {
		id: uniqid.time(),
		name,
		itemType: 'file',
		isCollapsed,
		parentId,
		level: 1,
	};
}

export function directory(
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
