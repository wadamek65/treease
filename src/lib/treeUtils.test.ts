import { expect, test } from 'vitest';
import { treeToJSON, JSONToASCII } from './treeUtils';
import { TreeStore } from '~/lib/TreeContext';
import { rootId } from '~/lib/itemUtils';
import { directory, file } from '~/lib/testUtils';

const treeToTest1: TreeStore = {
	isPrinting: false,
	items: directory('/root', false, '', rootId)
		.children([
			directory('a_dir', false, rootId).children([
				file('a_file.txt'),
				directory('a_dir').children([file('file.txt')]),
				file('c_file.txt'),
				directory('b_dir').children([file('file.txt')]),
				file('b_file.txt'),
			]),
		])
		.toItems(),
};

const treeToTest2: TreeStore = {
	isPrinting: false,
	items: directory('/root', false, '', rootId)
		.children([
			directory('a_dir', true, rootId).children([
				file('a_file.txt'),
				file('c_file.txt'),
				file('b_file.txt'),
			]),
		])
		.toItems(),
};

const treeToTest3: TreeStore = {
	isPrinting: false,
	items: directory('/root', false, '', rootId)
		.children([
			directory('dir1', false, rootId).children([
				file('file1.txt'),
				file('file2.txt'),
				directory('dir2').children([file('file3.txt')]),
			]),
		])
		.toItems(),
};

const tests = [treeToTest1, treeToTest2, treeToTest3];

test.each(tests)('treeToJSON tests - %#', (treeToTest) => {
	const result = treeToJSON(treeToTest);
	// treeToJSON does not sort the children
	expect(result).toMatchSnapshot();
});

test.each(tests)('JSONToASCII tests - %#', (treeToTest) => {
	const result = JSONToASCII(treeToJSON(treeToTest));
	// treeToJSON does not sort the children
	expect(result).toMatchSnapshot();
});
