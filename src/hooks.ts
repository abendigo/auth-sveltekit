import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import * as cookie from 'cookie';

import { createStore, getStore } from './lib/store';

const SESSION_COOKIE = 'auth.sid';

export const handle: Handle = async ({ event, resolve }) => {
	const store = getStore() || createStore();

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const sid = cookies[SESSION_COOKIE] || uuid();

	event.locals = store.getLocals(sid) || store.createLocals(sid, {});

	// console.log('==== before ===================', event.locals);
	const response = await resolve(event);
	// console.log('==== after  ===================', event.locals);

	if (!cookies[SESSION_COOKIE]) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize(SESSION_COOKIE, sid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

export function getSession(event: RequestEvent): App.Session {
	const { locals } = event;

	return { ...locals };
}
