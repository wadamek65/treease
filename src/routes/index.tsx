import { Layout } from '~/components/Layout';
import { Tree } from '~/components/Tree/Tree';
import { TreeProvider } from '~/components/TreeProvider/TreeProvider';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';
import { TreeToolbar } from '~/components/TreeToolbar/TreeToolbar';
import { Toaster } from '~/components/Toaster';

export default function Home() {
	return (
		<main class="mx-auto p-4 text-gray-700">
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
						<h2 class="mb-4 text-4xl">Hotkeys</h2>
						<div class="grid grid-cols-[min-content_1fr] items-center gap-x-16 gap-y-4">
							<span class="rounded-sm border-2 border-dashed border-blue-200 px-3 py-1 font-bold text-blue-500">
								d
							</span>
							<span>
								New <span class="font-bold text-blue-500">d</span>irectory
							</span>
							<span class="rounded-sm border-2 border-dashed border-blue-200 px-3 py-1 font-bold text-blue-500">
								f
							</span>
							<span>
								New <span class="font-bold text-blue-500">f</span>ile
							</span>
							<span class="rounded-sm border-2 border-dashed border-blue-200 px-3 py-1 font-bold text-blue-500">
								e
							</span>
							<span>
								<span class="font-bold text-blue-500">E</span>dit name
							</span>
							<span class="rounded-sm border-2 border-dashed border-blue-200 px-3 py-1 font-bold text-blue-500">
								r
							</span>
							<span>
								Recursive <span class="font-bold text-blue-500">r</span>emove item
							</span>
							<span class="rounded-sm border-2 border-dashed border-blue-200 px-3 py-1 font-bold text-blue-500">
								b
							</span>
							<span>
								Recursive <span class="font-bold text-blue-500">b</span>duplicate
							</span>
						</div>
					</div>
					<div>
						<h2 class="mb-4 mt-8 text-4xl">Navigation</h2>
					</div>
				</div>
			</Layout>
		</main>
	);
}
