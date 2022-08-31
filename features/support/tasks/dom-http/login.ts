import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

import { v4 as uuid } from '@lukeed/uuid';

import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import type { LoginSession } from '../../../../src/lib/screens/login.session';
import LoginScreen from '../../../../src/lib/screens/login.svelte'; // '../../src/lib/screens/login.svelte';
import { post } from '../../../../src/routes/login/index.js';

import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

import { HttpSessionHandler } from '../../../../src/lib/sessionHandler/HttpSessionHandler';

// import 'global-jsdom/register';
// import { JSDOM } from 'jsdom';

// import { login as sessionLogin } from '../session/login';

export const isAuthenticated = (username: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;
		console.log('=== dom isAuthenticated ===', { store });

		// const sid: string = actor.recall('auth.sid');
		// const locals = store.getLocals(sid);
		// console.log('====', { sid, locals });
		const locals = store.getLocalsForUser(username);
		console.log('====', { locals });

		console.log('isAuthenticated', locals);
		return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;
		const document = actor.world.document;
		console.log('dom login', { store, document });

		const sid = uuid();
		const locals = store.createLocals(sid);
		const link = locals.link;

		// Remember the session ID, so we can ccess the local session later
		// actor.remember('auth.sid', sid);

		// const loginSessionHandler: LoginSession = {
		// 	validate: async (username, password, token) => {
		// 		console.log('==== dom login validate ====', username, password, token);

		// 		// return sessionLogin(username, password);

		// 		const request: Request = {
		// 			json: async () => {
		// 				return { username, password, token };
		// 			}
		// 		} as unknown as Request;

		// 		const requestEvent: RequestEvent = {
		// 			request
		// 		} as unknown as RequestEvent;

		// 		console.log('=== calling post ====');
		// 		const response = await post(requestEvent);
		// 		console.log('=== response ===', response);
		// 	}
		// };

		const { container, getByRole, getByLabelText } = render(
			LoginScreen,
			{
				// target: document.body.appendChild(document.createElement('div')),
				// target = target || container.appendChild(document.createElement("div"));

				props: {
					token: `foo:${link}`,
					session: new HttpSessionHandler(actor.world.baseUrl).login
				}
			},
			{ container: document.body }
		);

		console.log({ container });

		const ccc = getByRole('textbox', { name: 'username' });
		await userEvent.type(ccc, username);
		const cc2 = getByLabelText('Password');
		await userEvent.type(cc2, password);
		const cc3 = getByRole('button', { name: /submit/i });
		await userEvent.click(cc3);

		await new Promise((r) => setTimeout(r, 2000));

		// await page.fill('input[name="username"]', username);
		// await page.fill('input[name="password"]', password);
		// await page.click('input[type="submit"]');
	};
};
