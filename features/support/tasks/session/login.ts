import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

import type World from '../../world';

import { post } from '../../../../src/routes/login';

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const store = actor.world.store;
		const locals = store.createLocals();
		const token = `${locals['csrf.token']}:${locals.link}`;

		const request: Request = {
			json: async () => {
				return { username, password, token };
			}
		} as unknown as Request;

		const requestEvent: RequestEvent = {
			request
		} as unknown as RequestEvent;

		return post(requestEvent);
		// const xxx = await post(requestEvent);
		// console.log('==-=-=--=-= xxx', xxx);
		// return xxx;
	};
};
