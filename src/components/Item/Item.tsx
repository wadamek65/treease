import { Component, createEffect, createMemo, For, Show } from 'solid-js';
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
import { cn } from '~/lib/cn';

type ItemProps = {
	id: string;
};

export const Item: Component<ItemProps> = (props) => {
	const { treeStore, toggleCollapsed } = useTreeContext();
	const item = useItemContext();

	const id = () => props.id;

	const draggable = createDraggable(id(), {
		get itemName() {
			return item.name;
		},
		get itemType() {
			return item.itemType;
		},
	});
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
					class={cn(
						droppable.isActiveDroppable && 'bg-secondary bg-opacity-20',
						!treeStore.isPrinting &&
							'focus:bg-base-200 focus:bg-opacity-30 focus:outline focus:outline-2 focus:outline-secondary',
						'relative my-1 flex w-fit items-center text-nowrap rounded-md border-dashed border-secondary pl-1 pr-2',
					)}
					tabIndex={0}
					role="treeitem"
					// style={transformStyle(draggable.transform)}
					ref={containerElement}
				>
					<Show when={!isRootId(props.id) && !treeStore.isPrinting}>
						<div
							{...draggable.dragActivators}
							class={cn(isDirectory(item) ? '-left-10' : '-left-5', 'absolute hover:cursor-grab')}
						>
							<DotsSixVertical class="size-5" />
						</div>
					</Show>
					<Show when={isDirectory(item)}>
						<button class="absolute -left-5" onClick={() => toggleCollapsed(props.id)}>
							{!item.isCollapsed ? (
								<CaretDown class="mr-1 size-4" />
							) : (
								<CaretRight class="mr-1 size-4" />
							)}
						</button>
					</Show>
					<div class="mr-1">
						<ExtensionIcon
							class="size-6 text-secondary"
							itemType={item.itemType}
							fileName={item.name}
						/>
					</div>
					<div class="flex h-full items-center">
						<Show when={!treeStore.isPrinting} fallback={item.name}>
							<NameInput focusElement={containerElement} ref={nameInputElement} />
						</Show>
					</div>
				</div>
			</div>
			<Show when={!item.isCollapsed}>
				<div class="border-l-2 pl-10">
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
