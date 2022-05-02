import { v4 as uuid } from '@lukeed/uuid';
import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { Headers } from 'node-fetch';

import type World from '../../world.js';

// import { getStore } from '../../../../src/lib/store.js';

import { post } from '../../../../src/routes/login/index.js';
import * as cookie from 'cookie';

export const isAuthenticated = () => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;

		const sid: string = actor.recall('auth.sid');
		const locals = store.getLocals(sid);
		console.log('isAuthenticated', locals);

		return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const store = actor.world.store;
		const locals = store.createLocals('111');

		const response = await fetch('http://localhost:3000/login', {
			method: 'post',
			body: JSON.stringify({ username, password, token: `${locals['csrf.token']}:${locals.link}` })
			// headers: {
			// 	cookie: cookie.serialize('auth.sid', '111', {
			// 		path: '/',
			// 		httpOnly: true
			// 	})
			// }
		});

		// console.log('response', response);
		const headers = response.headers;
		console.log('headers', headers);
		// const cookies = headers.get('set-cookie');
		const cookies = cookie.parse(response.headers.get('set-cookie') || '');
		console.log('cookies', cookies);

		// Remember the session ID, so we can ccess the local session later
		actor.remember('auth.sid', '111'); // cookies['auth.sid']);
		console.log('after', store.getLocals('111'));

		return { status: response.status, body: await response.json() };
		// const sid = uuid();
		// const locals = createLocals(sid);
		// const link = locals.link;

		// // Remember the session ID, so we can ccess the local session later
		// actor.remember('sid', sid);

		// const token = `foo:${link}`;

		// const request: Request = {
		// 	json: async () => {
		// 		return { username, password, token };
		// 	}
		// } as unknown as Request;

		// const requestEvent: RequestEvent = {
		// 	request
		// } as unknown as RequestEvent;

		// return post(requestEvent);
	};
};
