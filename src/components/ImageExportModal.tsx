import { Component } from 'solid-js';

export const ImageExportModal: Component = () => {
	return (
		<dialog id="image-export-modal" class="modal">
			<div class="modal-box">
				<form method="dialog">
					<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
				</form>
				<h3 class="text-lg font-bold">Export image</h3>
				<img id="image-export-modal-image" class="w-full" />
				<p class="py-4">Press ESC key or click on ✕ button to close</p>
			</div>
		</dialog>
	);
};
