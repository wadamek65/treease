import { createShortcut } from '@solid-primitives/keyboard';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';
import { useItemContext } from '~/components/ItemProvider/useItemContext';

export function createShortcuts(containerElement: HTMLElement, nameInputElement: HTMLDivElement) {
	const item = useItemContext();
	const { collapseItem, createNewItem, expandItem, removeItem, duplicateItem } = useTreeContext();

	createShortcut(['Alt', 'D'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		duplicateItem(item.id);
	});

	createShortcut(['D'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		const isFile = item.itemType === 'file';
		createNewItem(isFile ? item.parentId : item.id, 'directory');
	});

	createShortcut(['F'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		const isFile = item.itemType === 'file';
		createNewItem(isFile ? item.parentId : item.id, 'file');
	});

	createShortcut(['E'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		nameInputElement.focus();
	});

	createShortcut(['R'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		removeItem(item.id);
	});

	createShortcut(['ArrowRight'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		expandItem(item.id);
	});

	createShortcut(['ArrowLeft'], (event) => {
		if (event?.target !== containerElement) {
			return;
		}
		collapseItem(item.id);
	});
}
