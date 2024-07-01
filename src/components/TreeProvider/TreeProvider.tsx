import { TreeContext, TreeStore } from '~/lib/TreeContext';
import { ParentComponent } from 'solid-js';
import { ItemTypes } from '~/lib/Item';
import { isFile, isRootId, rootId } from '~/lib/itemUtils';
import { createStore, produce, unwrap } from 'solid-js/store';
import uniqid from 'uniqid';
import { focusFirstChildItemElement, focusItemElement } from '~/lib/domUtils';

export const initialState: TreeStore = {
	items: {
		[rootId]: {
			id: rootId,
			name: '',
			itemType: 'directory',
			isCollapsed: false,
			parentId: '',
			level: 0,
		},
	},
	isPrinting: false,
};

type TreeProviderProps = {
	initialValue?: TreeStore;
};

export const TreeProvider: ParentComponent<TreeProviderProps> = (props) => {
	const [treeStore, setTreeStore] = createStore<TreeStore>(props.initialValue ?? initialState);

	function createNewItem(parentId: string, itemType: ItemTypes) {
		const newId = uniqid.time();
		setTreeStore('items', newId, {
			id: newId,
			parentId,
			itemType,
			name: '',
			isCollapsed: false,
			level: (treeStore.items[parentId]?.level ?? 0) + 1,
		});
	}

	function removeItem(id: string) {
		if (!isRootId(id)) {
			const parentId = treeStore.items[id].parentId;
			focusItemElement(parentId);
		}

		setTreeStore(
			'items',
			produce((currentItems) => {
				function removeRecursive(parentId: string) {
					delete currentItems[parentId];

					Object.values(currentItems)
						.filter((item) => item.parentId === parentId)
						.forEach((item) => {
							removeRecursive(item.id);
						});
				}

				removeRecursive(id);
			}),
		);
	}

	function renameItem(id: string, newName: string) {
		setTreeStore('items', id, 'name', newName);
	}

	function collapseItem(id: string) {
		setTreeStore('items', id, 'isCollapsed', (prevCollapsed) => {
			const item = treeStore.items[id];
			if ((prevCollapsed || isFile(item)) && !isRootId(id)) {
				focusItemElement(item.parentId);
			}

			return true;
		});
	}

	function expandItem(id: string) {
		function setter(prevCollapsed: boolean) {
			if (!prevCollapsed) {
				focusFirstChildItemElement();
			}
			return false;
		}

		setTreeStore('items', id, 'isCollapsed', setter);
	}

	function toggleCollapsed(id: string) {
		setTreeStore('items', id, 'isCollapsed', (prevCollapsed) => !prevCollapsed);
	}

	function changeParent(id: string, newParentId: string) {
		if (isRootId(id) || id === newParentId) {
			return;
		}

		setTreeStore(
			'items',
			produce((items) => {
				// Check if we're trying to place an item in one of it's descendants
				let shouldReturn = false;
				let parentToCheck = items[newParentId];
				while (parentToCheck) {
					if (isRootId(newParentId)) {
						break;
					}
					if (parentToCheck.parentId === id) {
						shouldReturn = true;
						break;
					}
					parentToCheck = items[parentToCheck.parentId];
				}
				if (shouldReturn) {
					return;
				}

				// Check if we're trying to drop something onto a file and not a directory
				let newParent = { level: 0, parentId: rootId, id: rootId };
				if (!isRootId(newParentId)) {
					const item = items[newParentId];
					if (item.itemType === 'directory') {
						newParent = item;
					} else {
						newParent = items[items[newParentId].parentId] ?? newParent;
					}
				}

				items[id].level = newParent.level + 1;
				items[id].parentId = newParent.id;

				function recursiveUpdateLevel(parentId: string, newLevel: number) {
					Object.values(items).forEach((item) => {
						if (item.parentId === parentId) {
							item.level = newLevel;
							recursiveUpdateLevel(item.id, item.level + 1);
						}
					});
				}

				recursiveUpdateLevel(id, items[id].level + 1);
				return items;
			}),
		);
	}

	function duplicateItem(id: string) {
		if (isRootId(id)) {
			return;
		}

		setTreeStore(
			'items',
			produce((items) => {
				const newId = uniqid.time();
				const itemCopy = structuredClone(unwrap(items[id]));
				itemCopy.id = newId;
				items[newId] = itemCopy;

				function recursiveCopy(oldParentId: string, newParentId: string) {
					Object.values(items).forEach((item) => {
						if (item.parentId === oldParentId) {
							const newItemCopy = structuredClone(unwrap(item));
							const newId = uniqid.time();
							newItemCopy.id = newId;
							newItemCopy.parentId = newParentId;
							items[newId] = newItemCopy;

							recursiveCopy(item.id, newId);
						}
					});
				}

				recursiveCopy(id, newId);
			}),
		);
	}

	function setIsPrinting(updater: ((isPrinting: boolean) => boolean) | boolean) {
		setTreeStore('isPrinting', updater);
	}

	return (
		<TreeContext.Provider
			value={{
				treeStore,
				createNewItem,
				removeItem,
				renameItem,
				collapseItem,
				expandItem,
				toggleCollapsed,
				changeParent,
				duplicateItem,
				setIsPrinting,
			}}
		>
			{props.children}
		</TreeContext.Provider>
	);
};
