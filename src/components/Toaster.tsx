import { Toaster as ArkToaster, createToaster, Toast } from '@ark-ui/solid';
import { X } from '~/components/icons/X';
import { Component } from 'solid-js';
import { CheckCircle } from '~/components/icons/CheckCircle';

export const toaster = createToaster({
	placement: 'bottom',
	overlap: false,
	max: 1,
});

export const Toaster: Component = () => {
	return (
		<ArkToaster toaster={toaster}>
			{(toast) => (
				<Toast.Root class="z-10 grid grid-cols-[min-content_1fr_min-content] items-center gap-4 rounded-md border-2 border-gray-200 bg-white px-4 py-2 shadow-md">
					<CheckCircle class="size-6 text-green-500" />
					<Toast.Title>{toast().title}</Toast.Title>
					<Toast.CloseTrigger>
						<X />
					</Toast.CloseTrigger>
				</Toast.Root>
			)}
		</ArkToaster>
	);
};
