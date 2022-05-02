/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		id: string;
		link?: string;
		'csrf.token'?: string;
		user?: any;
	}

	// interface Platform {
	// 	id: string;
	// }

	interface Session {
		id: string;
		link?: string;
		'csrf.token'?: string;
	}

	// interface Stuff {}
}
