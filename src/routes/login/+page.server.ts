import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usernames } from '$lib/services/usernames';
import { dev } from '$app/environment';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/preparation');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');

		if (typeof username !== 'string') {
			return fail(400, { wrongUsername: true, username: '' });
		}

		const trimmedUsername = username.trim();

		if (!usernames.includes(trimmedUsername)) {
			return fail(400, { wrongUsername: true, username: trimmedUsername });
		}

		cookies.set('username', trimmedUsername, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev,
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/preparation');
	}
};

