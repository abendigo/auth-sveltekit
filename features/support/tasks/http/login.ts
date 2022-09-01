import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';

import fetch from 'node-fetch';

import { HttpLoginSessionHandler } from '../../../../src/lib/screens/login.session';

import type World from '../../world.js';

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const store = actor.world.store;
		const locals = store.createLocals();
		const token = `${locals['csrf.token']}:${locals.link}`;

		const handler = new HttpLoginSessionHandler(fetch, actor.world.baseUrl as string);

		return handler.validate(username, password, token);
	};
};
