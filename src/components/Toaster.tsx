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
				<Toast.Root role="alert" class="alert w-fit">
					<CheckCircle class="size-6 text-success" />
					<Toast.Title>{toast().title}</Toast.Title>
					<Toast.CloseTrigger class="btn btn-circle btn-ghost">
						<X class="size-4" />
					</Toast.CloseTrigger>
				</Toast.Root>
			)}
		</ArkToaster>
	);
};
