export function getActiveItemElement(): Element | null {
	return document.querySelector('[data-tree-item]:focus');
}

export function getAllItemElements(): HTMLElement[] {
	return Array.from(document.querySelectorAll('[data-tree-item]'));
}

export function getParentItemElement(): HTMLElement | null | undefined {
	const activeItemElement = getActiveItemElement();
	if (!activeItemElement) {
		return null;
	}

	return activeItemElement.parentNode?.querySelector('[data-tree-item]');
}

export function getActiveItemElementIndex(): number {
	const activeItemElement = getActiveItemElement();
	if (!activeItemElement) {
		return -1;
	}

	const allItemElements = getAllItemElements();
	return allItemElements.findIndex((treeItem) => treeItem.isEqualNode(activeItemElement));
}

export function focusClosestActiveElement(fallback: 'last' | 'first'): void {
	const closestActiveItemElement = document.activeElement?.closest<HTMLElement>('[data-tree-item]');
	if (closestActiveItemElement) {
		closestActiveItemElement.focus();
	} else {
		const allItemElements = getAllItemElements();
		if (allItemElements.length > 0) {
			allItemElements[fallback === 'first' ? 0 : allItemElements.length - 1].focus();
		}
	}
}

export function focusFirstChildItemElement(): void {
	const activeElement = getActiveItemElement();
	if (!activeElement) {
		return;
	}

	const activeElementLevel = activeElement.attributes.getNamedItem('data-tree-item-level');
	if (!activeElementLevel) {
		return;
	}

	const nextLevel = Number(activeElementLevel.value) + 1;
	activeElement.parentNode
		?.querySelector<HTMLElement>(`[data-tree-item-level="${nextLevel}"]`)
		?.focus();
}

export function focusItemElement(id: string): void {
	document.querySelector<HTMLElement>(`[data-tree-item="${id}"]`)?.focus();
}
