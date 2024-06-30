import { useContext } from 'solid-js';
import { TreeContext } from '~/lib/TreeContext';

export function useTreeContext() {
	const value = useContext(TreeContext);
	if (!value) {
		throw new Error('TreeProvider not defined in the tree.');
	}

	return value;
}
