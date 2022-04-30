<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load(input: LoadInput): Promise<LoadOutput> {
		console.log('input', { input });
		return {
			status: 200
			// 		error: 'Not logged In'
		};
	}
</script>

<script>
	// import LoginScreen from '../../lib/screens/login.svelte';
</script>

<h2>Auth</h2>
