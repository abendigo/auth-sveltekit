import { append } from 'svelte/internal';

const commonOptions = {
	publishQuiet: true,
	import: ['features/steps/*.ts', 'features/support/world.ts']
};

export default {
	...commonOptions
};

export const http = {
	...commonOptions,
	worldParameters: {
		session: 'HttpSession'
	}
};

export const dom = {
	...commonOptions,
	worldParameters: {
		session: 'Dom'
	}
};

export const dom_http = {
	...commonOptions,
	worldParameters: {
		session: 'DomHttpSession'
	}
};

export const fullstack = {
	...commonOptions,
	worldParameters: {
		session: 'FullStack'
	}
};
