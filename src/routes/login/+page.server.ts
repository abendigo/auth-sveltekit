import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

// import { deleteLocals, getUser, getLocalsByLink, updateLocals } from '../../lib/store.js';
import { getStore } from '../../lib/store.js';

export const POST: RequestHandler = async ({ request }) => {
	const store = getStore();

	const { username, password, token }: { username: string; password: string; token: string } =
		await request.json();

	// console.log(locals);
	// Check the CSRF Token
	const [csrf, link] = token.split(':');

	console.log('login post', { username, password, token, link, store });

	const user = store.getUser(username, password);

	if (!user) {
		console.log('--- not found ---');
		return {
			status: 200,
			body: {
				code: 401,
				error: 'Invalid Username/Password'
			}
		};
	}

	// Got a valid User. Find the Local Session
	const xxx = store.getLocalsByLink(link);
	if (xxx) {
		store.updateLocals(xxx.id, { user: user });
	}

	// if (user.auth_id) {
	// 	if (user.auth_id !== locals.id) {
	// 		console.log('--- deleting', locals.id);
	// 		deleteLocals(locals.id);
	// 		// Use the logged in session id
	// 		console.log('--- setting', user.auth_id);
	// 		locals.id = user.auth_id;
	// 	}
	// } else {
	// 	console.log('-- updating user', locals.id);
	// 	user.auth_id = locals.id;
	// }

	return {
		status: 200,
		body: {
			code: 200,
			error: 'success'
		}
	};
};
