import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

import { deleteLocals, getUser, getLocalsByLink, updateLocals } from '../../lib/store';

export const post: RequestHandler = async ({ locals, request }) => {
	const { username, password, token }: { username: string; password: string; token: string } =
		await request.json();

	console.log(locals);
	// Check the CSRF Token
	const [csrf, link] = token.split(':');
	console.log('----', csrf, link);

	const user = getUser(username, password);
	console.log('==== user', user);
	if (!user) {
		return {
			status: 200,
			body: {
				code: 401,
				error: 'Invalid Username/Password'
			}
		};
	}

	// Got a valid User. Find the Local Session
	const xxx = getLocalsByLink(link);
	console.log('xxx', xxx);

	updateLocals(xxx.id, { user: user });

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
