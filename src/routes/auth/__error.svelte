<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, error, status, stuff }) => {
		// const xxx: App.Stuff = stuff;
		// xxx.sessionHandler

		console.log('___error', stuff, stuff.sessionHandler);
		return {
			props: { status, error, session, sessionHandler: stuff.sessionHandler.login }
		};
	};
</script>

<script lang="ts">
	import type { LoginSessionHandler } from '../../lib/screens/login.session';
	import LoginScreen from '../../lib/screens/login.svelte';

	export let status: number;
	export let error: any;
	export let session: App.Session;
	export let sessionHandler: LoginSessionHandler;

	console.log('loginSession', sessionHandler);
</script>

{#if status === 401}
	<LoginScreen session={sessionHandler} token={`${session['csrf.token']}:${session.link}`} />
{:else}
	<h2>{error.name}</h2>
	{error.message}
{/if}
<hr />
{JSON.stringify(session)}
