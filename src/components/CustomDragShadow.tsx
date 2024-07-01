import { Component } from 'solid-js';
import { DotsSixVertical } from '~/components/icons/DotsSixVertical';
import { Directory } from '~/components/icons/Directory';
import { File } from '~/components/icons/File';
import { useDragDropContext } from '@thisbeyond/solid-dnd';
import { Editable } from '@ark-ui/solid';

export const CustomDragShadow: Component = () => {
	const [{ active }] = useDragDropContext()!;

	const itemType = () => active.draggable?.data?.itemType;
	const itemName = () => active.draggable?.data?.itemName;

	return (
		<div
			class="relative my-1 flex w-fit items-center text-nowrap rounded-md border-0 border-dashed border-secondary bg-secondary bg-opacity-20 pl-2 pr-4"
			tabIndex={0}
			role="treeitem"
		>
			<div class="absolute -left-6 hover:cursor-grab">
				<DotsSixVertical />
			</div>
			<div class="mx-1">{itemType() === 'directory' ? <Directory /> : <File />}</div>
			<Editable.Root class="my-1" autoResize value={itemName()}>
				<Editable.Area>
					<Editable.Input class="outline-dashed outline-1 outline-base-300" />
					<Editable.Preview />
				</Editable.Area>
			</Editable.Root>
		</div>
	);
};
