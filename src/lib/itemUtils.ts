import { Item } from '~/lib/Item';

export const rootId = 'root';

export function isRoot(item: Item) {
	return item.id === rootId;
}

export function isRootId(itemId: string) {
	return itemId === rootId;
}

export function isFile(item: Item) {
	return item.itemType === 'file';
}

export function isDirectory(item: Item) {
	return item.itemType === 'directory';
}
