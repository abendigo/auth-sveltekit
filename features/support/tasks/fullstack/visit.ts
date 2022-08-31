import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';
import type { RequestHandlerOutput } from '@sveltejs/kit';

export const authenticate = () => {
	return async (actor: Actor) => {};
};

export const visit = (site: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const world: World = actor.world;
		const store = actor.world.store;

		const sid = '1111';

		const url = `${world.baseUrl}/test/forwardauth/${sid}/${site}`;
		console.log('url', url);

		const response = await fetch(url);
		console.log('visit', response);
		return response;
	};
};
