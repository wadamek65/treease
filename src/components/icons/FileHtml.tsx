import { Component } from 'solid-js';

export const FileHtml: Component<{ class?: string }> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" class={props.class} viewBox="0 0 256 256">
			<path
				fill="currentColor"
				d="M216 120V88a8 8 0 0 0-2.34-5.66l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v80a8 8 0 0 0 16 0V40h88v48a8 8 0 0 0 8 8h48v24a8 8 0 0 0 16 0m-56-68.69L188.69 80H160ZM68 160v48a8 8 0 0 1-16 0v-16H32v16a8 8 0 0 1-16 0v-48a8 8 0 0 1 16 0v16h20v-16a8 8 0 0 1 16 0m56 0a8 8 0 0 1-8 8h-8v40a8 8 0 0 1-16 0v-40h-8a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8m72 0v48a8 8 0 0 1-16 0v-24l-9.6 12.8a8 8 0 0 1-12.8 0L148 184v24a8 8 0 0 1-16 0v-48a8 8 0 0 1 14.4-4.8l17.6 23.47l17.6-23.47A8 8 0 0 1 196 160m56 48a8 8 0 0 1-8 8h-28a8 8 0 0 1-8-8v-48a8 8 0 0 1 16 0v40h20a8 8 0 0 1 8 8"
			/>
		</svg>
	);
};
