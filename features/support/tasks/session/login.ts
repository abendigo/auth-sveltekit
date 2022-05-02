import { v4 as uuid } from '@lukeed/uuid';
import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { Headers } from 'node-fetch';

import { createLocals, getLocals } from '../../../../src/lib/store.js';

import { post } from '../../../../src/routes/login/index.js';

export const isAuthenticated = () => {
	return async (actor: Actor) => {
		const sid: string = actor.recall('auth.sid');
		const locals = getLocals(sid);

		return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor): Promise<RequestHandlerOutput> => {
		const sid = uuid();
		const locals = createLocals(sid);
		const link = locals.link;

		// Remember the session ID, so we can ccess the local session later
		actor.remember('auth.sid', sid);

		const token = `foo:${link}`;

		const request: Request = {
			json: async () => {
				return { username, password, token };
			}
		} as unknown as Request;

		const requestEvent: RequestEvent = {
			request
		} as unknown as RequestEvent;

		return post(requestEvent);
	};
};
