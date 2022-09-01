import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

export const isAuthenticated = (username: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;

    const locals = store.getLocalsForUser(username);

    return locals?.user !== undefined;
	};
};
