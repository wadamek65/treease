export type ItemTypes = 'file' | 'directory';

export type Item = {
	id: string;
	name: string;
	level: number;
	itemType: ItemTypes;
	isCollapsed: boolean;
	parentId: string;
};
