import { Component } from 'solid-js';
import { useTreeContext } from '~/components/TreeProvider/useTreeContext';
import { itemsToSortedByTypeName, ItemWithChildren, treeToJSON } from '~/lib/treeUtils';
import { toaster } from '~/components/Toaster';

const successToast = () =>
	toaster.success({
		title: 'Copied to clipboard',
		type: 'success',
	});

export const TreeToolbar: Component = () => {
	const { treeStore, setIsPrinting } = useTreeContext();

	function handleToJSON() {
		const json = treeToJSON(treeStore);

		navigator.clipboard.writeText(JSON.stringify(json)).then(() => successToast());
	}

	function handleToText() {
		const json = treeToJSON(treeStore);

		function recursiveToText(item: ItemWithChildren): string {
			return itemsToSortedByTypeName(item.children)
				.map((child) => {
					const indent = child.level > 0 ? '├' + '─'.repeat(child.level) : '';
					const leadingSlash = child.itemType === 'directory' ? '/' : '';
					return indent + ' ' + child.name + leadingSlash + '\n' + recursiveToText(child);
				})
				.join('');
		}

		const text = '┌ ' + json.name + '\n' + recursiveToText(json);
		navigator.clipboard.writeText(text).then(() => successToast());
	}

	function handlePrintMode() {
		setIsPrinting((prevPrinting) => !prevPrinting);
	}

	return (
		<div class="flex">
			<div class="join mb-4 flex">
				<button class="btn btn-outline btn-primary join-item btn-sm" onClick={handleToJSON}>
					Copy JSON
				</button>
				<button class="btn btn-outline btn-primary join-item btn-sm" onClick={handleToText}>
					Copy ASCII
				</button>
			</div>
			<div class="form-control ml-8 justify-self-end">
				<label class="label cursor-pointer">
					<span class="label-text mr-4 font-bold">Print mode</span>
					<input
						type="checkbox"
						class="toggle toggle-primary"
						checked={treeStore.isPrinting}
						onChange={handlePrintMode}
					/>
				</label>
			</div>
		</div>
	);
};
