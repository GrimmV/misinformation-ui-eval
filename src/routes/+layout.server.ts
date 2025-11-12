import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const PUBLIC_PATHS = ['/login'];

export const load: LayoutServerLoad = ({ locals, url }) => {
	const isPublicRoute = PUBLIC_PATHS.some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`));

	if (!locals.user && !isPublicRoute) {
		throw redirect(303, '/login');
	}

	if (locals.user && isPublicRoute) {
		throw redirect(303, '/preparation');
	}

	return {
		user: locals.user
	};
};

