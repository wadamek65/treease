import { Component } from 'solid-js';

export const CaretDown: Component<{ class?: string }> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" class={props.class} viewBox="0 0 256 256">
			<path
				fill="currentColor"
				d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"
			/>
		</svg>
	);
};
