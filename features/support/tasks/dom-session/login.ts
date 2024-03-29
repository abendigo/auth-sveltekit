import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

import { v4 as uuid } from '@lukeed/uuid';

import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

// import type { LoginSession } from '../../../../src/lib/screens/login.session';
import LoginScreen from '../../../../src/lib/screens/login.svelte'; // '../../src/lib/screens/login.svelte';
import { post } from '../../../../src/routes/login/index.js';

import XXX from '../../../../build/client/_app/pages/login/index.svelte-25840d3c.js';
console.log("XXX", XXX);

import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';

// import { DomainLoginSessionHandler } from './login.session.js';

// import 'global-jsdom/register';
// import { JSDOM } from 'jsdom';

// import { login as sessionLogin } from '../session/login';

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;
		const document = actor.world.document;
		console.log('dom login', { store, document });

		const sid = uuid();
		const locals = store.createLocals(sid);
		const link = locals.link;

		// Remember the session ID, so we can ccess the local session later
		actor.remember('auth.sid', sid);

		const loginSessionHandler = {
			validate: async (username: string, password: string, token: string) => {
				console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
				console.log('==== dom login validate ====', username, password, token);

				// return sessionLogin(username, password);

				const request: Request = {
					json: async () => {
						return { username, password, token };
					}
				} as unknown as Request;

				const requestEvent: RequestEvent = {
					request
				} as unknown as RequestEvent;

				return post(requestEvent);
				// console.log('=== calling post ====');
				// const response = await post(requestEvent);
				// console.log('=== response ===', response);
			}
		};

		const { container, getByRole, getByLabelText } = render(
      // XXX,
			LoginScreen,
			{
		// 		// target: document.body.appendChild(document.createElement('div')),
		// 		// target = target || container.appendChild(document.createElement("div"));

		// 		props: {
		// 			token: `foo:${link}`,
		// 			session: loginSessionHandler //new DomainLoginSessionHandler('')
		// 		}
			},
			{ container: document.body }
		);
/*
		console.log({ container });

		const ccc = getByRole('textbox', { name: 'username' });
		await userEvent.type(ccc, username);
		const cc2 = getByLabelText('Password');
		await userEvent.type(cc2, password);
		const cc3 = getByRole('button', { name: /submit/i });
		await userEvent.click(cc3);
		// await page.fill('input[name="username"]', username);
		// await page.fill('input[name="password"]', password);
		// await page.click('input[type="submit"]');
*/
	};
};
