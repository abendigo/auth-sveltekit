<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, error, status }) => {
		console.log('___error', error, error?.name, error.message);
		return {
			props: { status, error, session }
		};
	};
</script>

<script lang="ts">
	import LoginScreen from '../../lib/screens/login.svelte';

	export let status: number;
	export let error: any;
	export let session: App.Session;
</script>

{#if status === 401}
	<LoginScreen token={`${session['csrf.token']}:${session.link}`} />
{:else}
	<h2>{error.name}</h2>
	{error.message}
{/if}
<hr />
{JSON.stringify(session)}
