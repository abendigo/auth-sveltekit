import type { RequestHandler } from '@sveltejs/kit';

// import { updateLocals } from '../../lib/store.js';

let link = 1;

export const get: RequestHandler = async ({ locals, request }) => {
	// export const get = async ({ locals, request }: any) => {
	// console.log('------------------------------------------');
	// console.log('locals', locals);
	// console.log('------------------------------------------');

	// Check for grants here
	if (locals.user) {
		return { status: 200 };
	}

	const { headers } = request;

	const xForwardedUri: string = headers.get('x-forwarded-uri') || '';
	const xForwardedMethod: string = headers.get('x-forwarded-method') || 'GET';

	const accept = [
		'/favicon.png',
		'/src/lib/header/svelte-logo.svg',
		'/src/lib/header/favicon.png',
		'/@fs/usr/src/app/.svelte-kit/runtime/client/start.js',
		'/src/routes/__layout.svelte',
		'/src/routes/auth/__error.svelte'
	];

	if (xForwardedMethod === 'POST' && xForwardedUri === '/login') {
		return {
			status: 307,
			headers: { location: 'http://auth.docker.localhost:3000/login' }
		};
	}

	if (xForwardedMethod === 'GET' && accept.includes(xForwardedUri)) {
		return {
			status: 307,
			headers: { location: `http://auth.docker.localhost:3000${xForwardedUri}` }
		};
	}

	return { status: 401 };
};
/*
export async function post(event: RequestEvent): Promise<RequestHandlerOutput> {
	console.log('=============== sleeping');

	await new Promise((r) => setTimeout(r, 10_000));

	console.log('=============== awake');

	const { params, request } = event;
	const data = await request.json();
	// const data = await request.formData();
	const { username, password } = data;
	// const username = data.get('username');

	console.log('auth post', params, data);

	if (username === 'mark') {
		return {
			status: 303,
			headers: {
				location: 'https://google.com'
			}
		};
	} else {
		return {
			status: 200,
			body: {
				code: 401,
				error: 'Invalid Username/Password'
			}
		};
	}
}
*/
