import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			// entry: './src/lib/Counter.svelte',
			entry: './features/support/tasks/dom-session/index.ts',
			name: 'MyLib',
			fileName: (format) => `dom-session-tasks.${format}.js`
		}
	}
});
