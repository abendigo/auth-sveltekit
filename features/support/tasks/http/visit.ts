import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { Headers } from 'node-fetch';
import * as cookie from 'cookie';
import type World from '../../world.js';

// import { get } from '../../../../src/routes/auth/index.js';
// import { getStore } from '../../../../src/lib/store.js';

export const authenticate = () => {
	return async (actor: Actor) => {};
};

export const visit = (site: string) => {
	return async (actor: Actor<World>): Promise<RequestHandlerOutput> => {
		const store = actor.world.store;
		const locals = store.createLocals('111');

		const authenticated: boolean = actor.recall('authenticated');
		if (authenticated) {
			store.updateLocals('111', { user: { username: 'mark' } });
		}

		const response = await fetch('http://localhost:3000/auth', {
			headers: {
				cookie: cookie.serialize('auth.sid', '111', {
					path: '/',
					httpOnly: true
				})
			}
		});

		store.dumpLocals();

		return { status: response.status };

		// const locals: App.Locals = { id: 'id', user: authenticated ? {} : undefined };

		// const request: Request = {
		// 	headers: new Headers({})
		// } as unknown as Request;

		// const requestEvent: RequestEvent = {
		// 	locals,
		// 	request,
		// 	url: new URL(site)
		// } as unknown as RequestEvent;

		// return get(requestEvent);
	};
};
