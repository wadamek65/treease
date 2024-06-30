import { Component } from 'solid-js';
import { Editable } from '@ark-ui/solid';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';
import { useItemContext } from '~/components/ItemProvider/useItemContext';

type NameInputProps = {
	focusElement: HTMLDivElement;
	ref: HTMLDivElement;
};

export const NameInput: Component<NameInputProps> = (props) => {
	const { renameItem } = useTreeContext();
	const item = useItemContext();

	const onNameChangeHandler = (details: Editable.ValueChangeDetails) => {
		renameItem(item.id, details.value);
	};

	return (
		<Editable.Root
			class="my-1 border-b-2 border-blue-200 hover:cursor-text"
			placeholder={item.name}
			autoResize
			defaultValue={item.name}
			onValueCommit={onNameChangeHandler}
			finalFocusEl={() => props.focusElement}
			startWithEditView={item.name === ''}
		>
			<Editable.Area>
				<Editable.Input
					class="outline-dashed outline-1 outline-gray-400"
					data-tree-item-input={item.id}
				/>
				<Editable.Preview ref={props.ref} />
			</Editable.Area>
		</Editable.Root>
	);
};
