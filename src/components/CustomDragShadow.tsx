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
			class="relative my-1 flex w-fit items-center text-nowrap rounded-md border-[1px] border-dashed border-gray-500 bg-blue-300 bg-opacity-30 pl-2 pr-4"
			tabIndex={0}
			role="treeitem"
		>
			<div class="absolute -left-6 hover:cursor-grab">
				<DotsSixVertical />
			</div>
			<div class="mx-1">{itemType() === 'directory' ? <Directory /> : <File />}</div>
			<Editable.Root class="my-1" autoResize value={itemName()}>
				<Editable.Area>
					<Editable.Input class="outline-dashed outline-1 outline-gray-400" />
					<Editable.Preview />
				</Editable.Area>
			</Editable.Root>
		</div>
	);
};
