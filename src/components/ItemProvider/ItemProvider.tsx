import { ParentComponent } from 'solid-js';
import { ItemContext } from '~/lib/ItemContext';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';

type ItemProviderProps = {
	id: string;
};

export const ItemProvider: ParentComponent<ItemProviderProps> = (props) => {
	const { treeStore } = useTreeContext();

	const item = () => treeStore.items[props.id];

	return <ItemContext.Provider value={item()}>{props.children}</ItemContext.Provider>;
};
