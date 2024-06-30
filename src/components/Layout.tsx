import { ParentComponent } from 'solid-js';

export const Layout: ParentComponent = (props) => {
	return <div class="grid grid-cols-2 px-32">{props.children}</div>;
};
