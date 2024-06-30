import { Component } from 'solid-js';
import { Item } from '~/components/Item/Item';
import { rootId } from '~/lib/itemUtils';
import { createShortcut } from '@solid-primitives/keyboard';
import {
	focusClosestActiveElement,
	getActiveItemElementIndex,
	getAllItemElements,
} from '~/lib/domUtils';
import { ItemProvider } from '~/components/ItemProvider/ItemProvider';
import { DragOverlay, useDragDropContext } from '@thisbeyond/solid-dnd';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';
import { CustomDragShadow } from '~/components/CustomDragShadow';

export const Tree: Component = () => {
	const { changeParent } = useTreeContext();
	const [, { onDragEnd }] = useDragDropContext()!;

	onDragEnd(({ draggable, droppable }) => {
		if (droppable) {
			changeParent(draggable.id as string, droppable.id as string);
		}
	});

	createShortcut(['ArrowDown'], () => {
		const index = getActiveItemElementIndex();
		if (index !== -1) {
			const allItemElements = getAllItemElements();
			const nextItem = allItemElements[index + 1] ?? allItemElements[0];
			nextItem.focus();
		} else {
			focusClosestActiveElement('first');
		}
	});

	createShortcut(['ArrowUp'], () => {
		const index = getActiveItemElementIndex();
		if (index !== -1) {
			const allItemElements = getAllItemElements();
			const nextItem = allItemElements[index - 1] ?? allItemElements[allItemElements.length - 1];
			nextItem.focus();
		} else {
			focusClosestActiveElement('last');
		}
	});

	return (
		<div class="flex justify-start">
			<DragOverlay>
				<CustomDragShadow />
			</DragOverlay>
			<ItemProvider id={rootId}>
				<Item id={rootId} />
			</ItemProvider>
		</div>
	);
};
