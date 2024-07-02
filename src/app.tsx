import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import { Navbar } from '~/components/Navbar';
import * as Sentry from '@sentry/solid';

Sentry.init({
	dsn: 'https://48ac6e79bc329723da73495b8ea31375@o552412.ingest.us.sentry.io/4507534455537664',
	integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
	tracesSampleRate: 1.0,
	tracePropagationTargets: [/^https:\/\/treease\.dev/],
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<Navbar />
					<Suspense>{props.children}</Suspense>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
