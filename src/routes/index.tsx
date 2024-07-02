import { Layout } from '~/components/Layout';
import { Tree } from '~/components/Tree/Tree';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';
import { TreeToolbar } from '~/components/TreeToolbar/TreeToolbar';
import { Toaster } from '~/components/Toaster';
import { For } from 'solid-js';
import { clientOnly } from '@solidjs/start';

const TreeProvider = clientOnly(() => import('~/components/TreeProvider/TreeProvider'));

type Hotkey = {
	keys: string[];
	description: string;
};

const hotkeys: Hotkey[] = [
	{ keys: ['d'], description: 'New directory' },
	{ keys: ['f'], description: 'New file' },
	{ keys: ['e'], description: 'Edit name' },
	{ keys: ['r'], description: 'Recursive remove item' },
	{ keys: ['alt', 'd'], description: 'Recursive duplicate' },
];

const navigationHotkeys: Hotkey[] = [
	{ keys: ['▼'], description: 'Focus below' },
	{ keys: ['▲'], description: 'Focus above' },
	{ keys: ['◀'], description: 'Collapse' },
	{ keys: ['▶'], description: 'Expand' },
];

function Hotkeys(props: { hotkeys: Hotkey[] }) {
	return (
		<div class="grid grid-cols-[200px,1fr] items-center gap-x-8 gap-y-4">
			<For each={props.hotkeys}>
				{(hotkey) => (
					<>
						<span>{hotkey.description}</span>
						<span class="flex items-center gap-x-2">
							<For each={hotkey.keys}>
								{(key, index) => (
									<>
										{index() > 0 && '+'}
										<kbd class="kbd">{key}</kbd>
									</>
								)}
							</For>
						</span>
					</>
				)}
			</For>
		</div>
	);
}

export default function Home() {
	return (
		<main class="px-4 pt-8 md:container md:mx-auto">
			<Toaster />
			<Layout>
				<DragDropProvider>
					<DragDropSensors>
						<TreeProvider>
							<div>
								<TreeToolbar />
								<Tree />
							</div>
						</TreeProvider>
					</DragDropSensors>
				</DragDropProvider>
				<div>
					<div>
						<h2 class="mb-2 text-4xl">Hotkeys</h2>
						<div class="mb-4 font-bold text-accent">When element is focused:</div>
						<Hotkeys hotkeys={hotkeys} />
					</div>
					<div>
						<h2 class="mb-4 mt-8 text-4xl">Navigation</h2>
						<Hotkeys hotkeys={navigationHotkeys} />
					</div>
				</div>
			</Layout>
		</main>
	);
}
