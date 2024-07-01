import { createContext } from 'solid-js';
import { ItemTypes, Item } from '~/lib/Item';

export type TreeStore = {
	items: Record<string, Item>;
	isPrinting: boolean;
};

type TreeContextValue = {
	treeStore: TreeStore;
	createNewItem: (parentId: string, itemType: ItemTypes) => void;
	removeItem: (id: string) => void;
	renameItem: (id: string, newName: string) => void;
	collapseItem: (id: string) => void;
	expandItem: (id: string) => void;
	toggleCollapsed: (id: string) => void;
	changeParent: (id: string, newParentId: string) => void;
	duplicateItem: (id: string) => void;
	setIsPrinting: (updater: ((isPrinting: boolean) => boolean) | boolean) => void;
};

export const TreeContext = createContext<TreeContextValue>();
