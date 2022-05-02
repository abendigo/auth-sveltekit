import type { Actor } from '@cucumber/screenplay';
import type World from '../../world.js';

import { render, fireEvent } from '@testing-library/svelte';
import LoginScreen from '../../../../src/lib/screens/login.svelte'; // '../../src/lib/screens/login.svelte';

export const isAuthenticated = () => {
	return async (actor: Actor<World>) => {
		// const store = actor.world.store;
		// const sid: string = actor.recall('auth.sid');
		// const locals = store.getLocals(sid);
		// console.log('isAuthenticated', locals);
		// return locals?.user !== undefined;
		return false;
	};
};

export const login = (username: string, password: string) => {
	return async (actor: Actor<World>) => {
		const screen = render(LoginScreen);
	};
};
