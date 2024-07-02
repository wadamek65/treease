import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { GitHub } from '~/components/icons/GitHub';

export const Navbar: Component = () => {
	return (
		<nav class="navbar bg-base-100">
			<div class="flex-1">
				<A class="btn btn-ghost text-xl" href="/">
					treease
				</A>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal items-center px-1">
					<li>
						<A target="_blank" href={'https://wadamek.me'}>
							wadamek.me
						</A>
					</li>
					<li>
						<A target="_blank" href={'https://github.com/wadamek65/treease'}>
							<GitHub class="size-8" />
						</A>
					</li>
				</ul>
			</div>
		</nav>
	);
};
