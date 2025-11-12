import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const username = event.cookies.get('username');

	event.locals.user = username ? { username } : null;

	return resolve(event);
};

