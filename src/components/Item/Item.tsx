import { Component, createMemo, For, Show } from 'solid-js';
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

type ItemProps = {
	id: string;
};

export const Item: Component<ItemProps> = (props) => {
	const {
		treeStore,
		collapseItem,
		createNewItem,
		expandItem,
		removeItem,
		toggleCollapsed,
		duplicateItem,
	} = useTreeContext();
	const item = useItemContext();

	const id = () => props.id;

	const draggable = createDraggable(id(), { itemName: item.name, itemType: item.itemType });
	const droppable = createDroppable(id());

	let nameInputElement!: HTMLDivElement;
	let containerElement!: HTMLDivElement;

	const childrenIds = createMemo(() => {
		return childrenToSortedByTypeName(treeStore, props.id);
	});

	const keyDownHandler = (event: KeyboardEvent) => {
		if (event.currentTarget !== event.target) {
			return;
		}
		const isFile = item.itemType === 'file';
		switch (event.code) {
			case 'KeyF': {
				createNewItem(isFile ? item.parentId : props.id, 'file');
				event.stopPropagation();
				break;
			}
			case 'KeyD': {
				createNewItem(isFile ? item.parentId : props.id, 'directory');
				event.stopPropagation();
				break;
			}
			case 'KeyR': {
				removeItem(props.id);
				event.stopPropagation();
				break;
			}
			case 'KeyE': {
				nameInputElement.focus();
				event.stopPropagation();
				break;
			}
			case 'KeyB': {
				duplicateItem(props.id);
				event.stopPropagation();
				break;
			}
			case 'ArrowRight': {
				expandItem(props.id);
				event.stopPropagation();
				break;
			}
			case 'ArrowLeft': {
				collapseItem(props.id);
				event.stopPropagation();
				break;
			}
		}
	};

	return (
		<div>
			<div ref={draggable.ref}>
				<div
					use:droppable
					data-tree-item={props.id}
					data-tree-item-level={item.level}
					class={`${droppable.isActiveDroppable ? 'bg-blue-100' : ''} relative my-1 flex w-fit items-center text-nowrap rounded-md border-[1px] border-dashed border-gray-300 pl-2 pr-4 focus:bg-blue-200 focus:bg-opacity-30 focus:outline focus:outline-2 focus:outline-blue-500`}
					tabIndex={0}
					role="treeitem"
					onKeyDown={keyDownHandler}
					// style={transformStyle(draggable.transform)}
					ref={containerElement}
				>
					<Show when={!isRootId(props.id)}>
						<div {...draggable.dragActivators} class="absolute -left-6 hover:cursor-grab">
							<DotsSixVertical />
						</div>
					</Show>
					<Show when={isDirectory(item)}>
						<button onClick={() => toggleCollapsed(props.id)}>
							{!item.isCollapsed ? <CaretDown /> : <CaretRight />}
						</button>
					</Show>
					<div class="mx-1">{item.itemType === 'directory' ? <Directory /> : <File />}</div>
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
