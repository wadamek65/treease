import { Component } from 'solid-js';

export const FileTs: Component<{ class?: string }> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" class={props.class} viewBox="0 0 256 256">
			<path
				fill="currentColor"
				d="M147.81 196.31a20.82 20.82 0 0 1-9.19 15.23C133.43 215 127 216 121.13 216a61.3 61.3 0 0 1-15.19-2a8 8 0 0 1 4.31-15.41c4.38 1.2 15 2.7 19.55-.36c.88-.59 1.83-1.52 2.14-3.93c.34-2.67-.71-4.1-12.78-7.59c-9.35-2.7-25-7.23-23-23.11a20.56 20.56 0 0 1 9-14.95c11.84-8 30.71-3.31 32.83-2.76a8 8 0 0 1-4.07 15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54 4.54 0 0 0-2 3.67c-.12.9-.14 1.09 1.11 1.9c2.31 1.49 6.45 2.68 10.45 3.84c9.84 2.83 26.4 7.66 24.16 24.97M216 88v128a16 16 0 0 1-16 16h-24a8 8 0 0 1 0-16h24V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88m-56-8h28.69L160 51.31Zm-80 64H40a8 8 0 0 0 0 16h12v48a8 8 0 0 0 16 0v-48h12a8 8 0 0 0 0-16"
			/>
		</svg>
	);
};