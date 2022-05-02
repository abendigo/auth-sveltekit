import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

import { render, fireEvent } from '@testing-library/svelte';

export const isAuthenticated = () => {
	return async (actor: Actor<World>) => {
		// const store = actor.world.store;
		// const sid: string = actor.recall('auth.sid');
		// const locals = store.getLocals(sid);
		// console.log('isAuthenticated', locals);
		// return locals?.user !== undefined;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>) => {
		const browser = actor.world.browser;
		if (!browser) return;

		const page = await browser.newPage();
		await page.goto('http://localhost:3000/auth');
		await page.fill('input[name="username"]', username);
		await page.fill('input[name="password"]', password);
		await page.click('input[type="submit"]');

		// await page.context().storageState({ path: 'storageState.json' });
	};
};
