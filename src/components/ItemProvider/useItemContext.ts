import { useContext } from 'solid-js';
import { ItemContext } from '~/lib/ItemContext';

export function useItemContext() {
	const item = useContext(ItemContext);
	if (!item) {
		throw new Error('ItemProvider is not defined.');
	}

	return item;
}
