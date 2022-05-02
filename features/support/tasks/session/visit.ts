import type { Actor } from '@cucumber/screenplay';
import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { Headers } from 'node-fetch';

import { get } from '../../../../src/routes/auth/index.js';

export const visit = (site: string) => {
	return async (actor: Actor): Promise<RequestHandlerOutput> => {
		const authenticated: boolean = actor.recall('authenticated');

		const locals: App.Locals = { id: 'id', user: authenticated ? {} : undefined };

		const request: Request = {
			headers: new Headers({})
		} as unknown as Request;

		const requestEvent: RequestEvent = {
			locals,
			request,
			url: new URL(site)
		} as unknown as RequestEvent;

		return get(requestEvent);
	};
};
