import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

import { render, fireEvent } from '@testing-library/svelte';

export const isAuthenticated = (username: string) => {
	return async (actor: Actor<World>) => {
		const store = actor.world.store;

		const locals = store.getLocalsForUser(username);
		// return store.isUserAuthenticated(username);

		// const store = actor.world.store;
		// const sid: string = actor.recall('auth.sid');
		// const locals = store.getLocals(sid);
		// console.log('isAuthenticated', locals);
		return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>) => {
		// const store = actor.world.store;
		const browser = actor.world.browser;
		if (!browser) return;

		const page = await browser.newPage();
		await page.goto(`${actor.world.baseUrl}/auth`);

		console.log('context', browser.contexts());
		const context = browser.contexts()[0];
		let cookies = await context.cookies();
		console.log('cookies', cookies);

		await page.fill('input[name="username"]', username);
		await page.fill('input[name="password"]', password);
		await page.click('input[type="submit"]');

		// await page.context().storageState({ path: 'storageState.json' });
		cookies = await context.cookies();
		console.log('cookies', cookies);

		const sid = cookies[0].value;

		// const locals = store.getLocals(sid);
		// console.log('locals', locals);
	};
};
