import { Component } from 'solid-js';

export const File: Component<{ class?: string }> = (props) => {
	return (
		<svg class={props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
			<path
				fill="currentColor"
				d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66M160 51.31L188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48z"
			/>
		</svg>
	);
};
