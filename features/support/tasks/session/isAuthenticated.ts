import type { Actor } from '@cucumber/screenplay';
// import type { RequestHandlerOutput } from '@sveltejs/kit';
// import type { RequestEvent } from '@sveltejs/kit/types/private';

import type World from '../../world.js';

// import { post } from '../../../../src/routes/login/index.js';

export const isAuthenticated = (username: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;

		const locals = store.getLocalsForUser(username);

		return locals?.user !== undefined;
	};
};
