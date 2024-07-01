import { Component } from 'solid-js';

export const FileCs: Component<{ class?: string }> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" class={props.class} viewBox="0 0 256 256">
			<path
				fill="currentColor"
				d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 0 1 11.56 11.06A30.06 30.06 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30.06 30.06 0 0 1 21.78 9.6a8 8 0 0 1-11.56 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20m168-92v136a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88m-56-8h28.69L160 51.31Zm8 88v16h8a8 8 0 0 1 0 16h-8v8a8 8 0 0 1-16 0v-8h-16v8a8 8 0 0 1-16 0v-8h-8a8 8 0 0 1 0-16h8v-16h-8a8 8 0 0 1 0-16h8v-8a8 8 0 0 1 16 0v8h16v-8a8 8 0 0 1 16 0v8h8a8 8 0 0 1 0 16Zm-16 0h-16v16h16Z"
			/>
		</svg>
	);
};
