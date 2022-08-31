import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';

import { HttpLoginSessionHandler } from '../../../../src/lib/screens/login.session.js';

import type World from '../../world.js';

export const isAuthenticated = (username: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;

		const locals = store.getLocalsForUser(username);

		return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const store = actor.world.store;
		const locals = store.createLocals();
		const token = `${locals['csrf.token']}:${locals.link}`;

		const handler = new HttpLoginSessionHandler(actor.world.baseUrl as string);

		return handler.validate(username, password, token);
	};
};
