import { TreeStore } from '~/lib/TreeContext';
import { Item } from '~/lib/Item';
import { rootId } from './itemUtils';

type PartialItem = Pick<Item, 'name' | 'itemType' | 'level'>;
export type ItemWithChildren = PartialItem & { children: ItemWithChildren[] };
export function treeToJSON(tree: TreeStore): ItemWithChildren {
	function toJSONRecursive(itemId: string): ItemWithChildren {
		const item = tree.items[itemId];
		return {
			name: item.name,
			itemType: item.itemType,
			level: item.level,
			children: Object.values(tree.items)
				.filter((child) => child.parentId === itemId)
				.map((item) => toJSONRecursive(item.id)),
		};
	}

	return toJSONRecursive(rootId);
}

export function childrenToSortedByTypeName(tree: TreeStore, parentId: string): string[] {
	return Object.values(tree.items)
		.filter((item) => item.parentId === parentId)
		.toSorted((a, b) => a.name.localeCompare(b.name))
		.toSorted((a, b) => (a.itemType === 'directory' ? (b.itemType === 'file' ? -1 : 0) : 1))
		.map((item) => item.id);
}

export function itemsToSortedByTypeName(items: ItemWithChildren[]): ItemWithChildren[] {
	return items
		.toSorted((a, b) => a.name.localeCompare(b.name))
		.toSorted((a, b) => (a.itemType === 'directory' ? (b.itemType === 'file' ? -1 : 0) : 1));
}

export function treeToSortedByLevelTypeName(tree: TreeStore): Item[] {
	return Object.values(tree.items)
		.toSorted((a, b) => a.name.localeCompare(b.name))
		.toSorted((a, b) => (a.level === b.level ? 0 : a.level > b.level ? 1 : -1))
		.toSorted((a, b) => (a.itemType === 'directory' ? (b.itemType === 'file' ? -1 : 0) : 1))
		.map((item) => item);
}
