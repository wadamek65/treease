import { A } from '@solidjs/router';

export default function NotFound() {
	return (
		<main class="flex justify-center">
			<div>
				<h1 class="max-6-xs my-16 text-4xl uppercase text-primary">Not Found</h1>
				<div class="my-4 text-center">
					<A href="/" class="link">
						home
					</A>
				</div>
			</div>
		</main>
	);
}
