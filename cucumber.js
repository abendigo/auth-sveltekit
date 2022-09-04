// console.log('>>>>> import.meta.url', import.meta.url);
// const xxx = new URL('features/support/tasks/session', import.meta.url);
// console.log('>>>>> xxx', xxx);
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const tasks = path.join(__dirname, 'features', 'support', 'tasks');

console.log('>>>>', __filename, __dirname, tasks);

const commonOptions = {
	publishQuiet: true,
	import: ['features/steps/*.ts', 'features/support/world.ts']
};

export default {
	...commonOptions,
	worldParameters: {
		// taskdir: './tasks/session/index.ts',
		// tasks: new URL('./features/support/tasks/session', import.meta.url),
		// tasks: path.join(tasks, 'session'),
		tasks: path.join(tasks, 'session'),
		session: 'DomainSessionHandler'
	}
};

export const http = {
	...commonOptions,
	worldParameters: {
		tasks: path.join(tasks, 'http'),
		session: 'HttpSessionHandler'
	}
};

export const dom = {
	...commonOptions,
	worldParameters: {
		// taskdir: '../../dist/dom-session-tasks.es.js',
		tasks: path.join(tasks, 'dom-session'),
		session: 'DomainSessionHandler',
		document: true
	}
};

export const dom_http = {
	...commonOptions,
	worldParameters: {
		taskdir: '../../dist/dom-http-tasks.es.js',
		session: 'HttpSessionHandler',
		document: true
	}
};

export const fullstack = {
	...commonOptions,
	worldParameters: {
		taskdir: './tasks/fullstack/index.ts',
		session: 'HttpSessionHandler',
		browser: 'chromium'
	}
};
