import { Component, createEffect, createMemo, For, Show } from 'solid-js';
import { Directory } from '~/components/icons/Directory';
import { File } from '~/components/icons/File';
import { isDirectory, isRootId } from '~/lib/itemUtils';
import { CaretRight } from '~/components/icons/CaretRight';
import { CaretDown } from '~/components/icons/CaretDown';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';
import { NameInput } from '~/components/Item/NameInput';
import { ItemProvider } from '~/components/ItemProvider/ItemProvider';
import { useItemContext } from '~/components/ItemProvider/useItemContext';
import { DotsSixVertical } from '~/components/icons/DotsSixVertical';
import { createDraggable, createDroppable } from '@thisbeyond/solid-dnd';
import { childrenToSortedByTypeName } from '~/lib/treeUtils';
import { createShortcuts } from '~/components/Item/createShortcuts';
import { ExtensionIcon } from '~/components/ExtensionIcon/ExtensionIcon';

type ItemProps = {
	id: string;
};

export const Item: Component<ItemProps> = (props) => {
	const { treeStore, toggleCollapsed } = useTreeContext();
	const item = useItemContext();

	const id = () => props.id;

	// itemName and itemType are not reactive: https://github.com/thisbeyond/solid-dnd/issues/86
	const draggable = createDraggable(id(), { itemName: item.name, itemType: item.itemType });
	const droppable = createDroppable(id());

	let nameInputElement!: HTMLDivElement;
	let containerElement!: HTMLDivElement;

	const childrenIds = createMemo(() => {
		return childrenToSortedByTypeName(treeStore, props.id);
	});

	createEffect(() => createShortcuts(containerElement, nameInputElement));

	return (
		<div data-tree-item-container="container">
			<div ref={draggable.ref}>
				<div
					use:droppable
					data-tree-item={props.id}
					data-tree-item-level={item.level}
					class={`${droppable.isActiveDroppable ? 'bg-secondary bg-opacity-20' : ''} relative my-1 flex w-fit items-center text-nowrap rounded-md border-[1px] border-dashed border-secondary pl-2 pr-4 focus:bg-base-200 focus:bg-opacity-30 focus:outline focus:outline-2 focus:outline-secondary`}
					tabIndex={0}
					role="treeitem"
					// style={transformStyle(draggable.transform)}
					ref={containerElement}
				>
					<Show when={!isRootId(props.id)}>
						<div {...draggable.dragActivators} class="absolute -left-6 hover:cursor-grab">
							<DotsSixVertical class="size-5" />
						</div>
					</Show>
					<Show when={isDirectory(item)}>
						<button onClick={() => toggleCollapsed(props.id)}>
							{!item.isCollapsed ? <CaretDown class="size-4" /> : <CaretRight class="size-4" />}
						</button>
					</Show>
					<div class="mx-1">
						<ExtensionIcon
							class="size-6 text-secondary"
							itemType={item.itemType}
							fileName={item.name}
						/>
					</div>
					<NameInput focusElement={containerElement} ref={nameInputElement} />
				</div>
			</div>
			<Show when={!item.isCollapsed}>
				<div class="border-l-2 pl-8">
					<For each={childrenIds()}>
						{(childId) => (
							<ItemProvider id={childId}>
								<Item id={childId} />
							</ItemProvider>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
};
