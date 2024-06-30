import { ParentComponent } from 'solid-js';

export const Layout: ParentComponent = (props) => {
	return <div class="grid grid-cols-[3fr,1fr] lg:px-24 xl:px-64">{props.children}</div>;
};
