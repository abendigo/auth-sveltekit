import {
	defineParameterType,
	setWorldConstructor,
	Before,
	BeforeAll,
	After
	// IWorldOptions
	// AfterAll
} from '@cucumber/cucumber';
import type { IWorldOptions } from '@cucumber/cucumber';
// import type { IWorldOptions } from '@cucumber/cucumber';
// import type { ITestCaseHookParameter, IWorldOptions } from '@cucumber/cucumber';
import { ActorParameterType, ActorWorld } from '@cucumber/screenplay';
import type { IActorWorldOptions } from '@cucumber/screenplay';
// import { IActorWorldOptions } from '@cucumber/screenplay/dist/src/ActorWorld';

// import ActorWorld from './ActorWorld.js';

import { createStore } from '../../src/lib/store';

import { chromium, webkit } from 'playwright';
import type { Browser } from 'playwright';

import 'global-jsdom/register';
import { JSDOM } from 'jsdom';

import path from 'path';
import { readdirSync } from 'fs';

// async function asyncAssignTasks<T>(thisObj: T, tasksDir: string): Promise<void> {
// 	if (!tasksDir) throw new Error(`tasksDir was ${tasksDir}`);
// 	const files = readdirSync(tasksDir);
// 	for (const file of files) {
// 		const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/);
// 		if (match) {
// 			const ext = match[1];
// 			const name = path.basename(file, ext);
// 			Object.defineProperty(thisObj, name, {
// 				value: await loadTask(name)
// 			});
// 		}
// 	}

// 	async function loadTask(name: string) {
// 		const path = `${tasksDir}/${name}`;
// 		try {
// 			// eslint-disable-next-line @typescript-eslint/no-var-requires
// 			// const task = await import(path + '.js');
// 			const task = await import(path);
// 			return task[name];
// 		} catch (err) {
// 			console.log('>>>>> err', err);
// 			return () => {
// 				throw new Error(`No task in: ${path}.{ts,js,tsx,jsx}`);
// 			};
// 		}
// 	}
// }

// function lazyAssignTasks<T>(thisObj: T, tasksDir: string): void {
// 	if (!tasksDir) throw new Error(`tasksDir was ${tasksDir}`);
// 	const files = readdirSync(tasksDir);
// 	for (const file of files) {
// 		const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/);
// 		if (match) {
// 			const ext = match[1];
// 			const name = path.basename(file, ext);
// 			Object.defineProperty(thisObj, name, {
// 				value: loadTask(name)
// 			});
// 		}
// 	}

// 	function loadTask(name: string) {
// 		console.log('>>>> LOADTASK', name);
// 		return () => {
// 			console.log('>>>> task loaded', name);
// 		};
// 	}
// }

// import { login, isAuthenticated } from './tasks/session/index.js';

// Define your own World class that extends from ActorWorld
export default class MyWorld extends ActorWorld {
	baseUrl: string | undefined;
	browser: Browser | undefined;
	document: any;
	store: any;
	// tasks: any;

	public isAuthenticated: any;
	public login: any;
	public visit: any;

	// constructor(props: IWorldOptions) {
	constructor(props: IWorldOptions) {
		console.log('>>>>> Myworld constructor', props);
		super({ ...props, packageType: 'module' });
		console.log('>>>>> Myworld constructor', this.parameters);
	}
}

// Define an {actor} parameter type that creates Actor objects
defineParameterType(ActorParameterType);
setWorldConstructor(MyWorld);

// BeforeAll(function (done: any) {
// 	console.log('BEFORE ALL w/DONE');
// 	done();
// });

BeforeAll(async function () {
	console.log('BEFORE ALL');
});

// import { handler } from '../../build/handler.js';
import express from 'express';
import request from 'request';

let server: { close: any };

// let browser: import('playwright').Browser;
// let browser: Browser;

// let page: import('playwright').Page;

// var globalString: string;

Before(async function (this: MyWorld /*, arg: ITestCaseHookParameter */) {
	console.log('BEFORE', this.parameters);

	if (this.promise) {
		await this.promise;
		// await asyncAssignTasks(this, this.parameters.taskdir);
		// lazyAssignTasks(this, this.parameters.taskdir);
		// this.tasks = await import(this.parameters.taskdir);
	}
	console.log('=== tasks ===', this.login, this.visit);

	// @ts-expect-error
	this.store = globalThis.forwardAuthStore = createStore();

	if (this.parameters.document) {
		const {
			window: { document }
		} = new JSDOM(`<html></html>`);
		console.log('=== window ===', document);
		this.document = document;
	}

	if (this.parameters.browser) {
		this.browser = await chromium.launch({ headless: false, slowMo: 100 });
		// const page = await browser.newPage();
		// await page.goto('http://whatsmyuseragent.org/');

		console.log('browser openned');
	}

	if (this.parameters.session === 'HttpSessionHandler') {
		const { handler } = await import('../../build/handler');

		const port = 3030; // need to figure out a way to change this

		// // @ts-expect-error
		// this.store = globalThis.forwardAuthStore = createStore();
		this.baseUrl = `http://localhost:${port}`;
		// this.store = getStore();

		const app = express();
		// add a route that lives separately from the SvelteKit app
		// app.get('/healthcheck', (req, res) => {
		// 	res.end('ok');
		// });
		app.get('/test/forwardauth/:sid/:domain', async (req, res) => {
			const url = `${this.baseUrl}/auth`;

			request
				.get(url, {
					headers: {
						'x-forwarded-method': 'GET',
						'x-forwarded-uri': req.params.domain
					}
				})
				.pipe(res);
		});

		app.use(handler);

		const p = new Promise((resolve /*, reject */) => {
			server = app.listen(port, (...args) => {
				console.log(`listening on port ${port}`, args);
				resolve(true);
			});
		});
		await p;
	}
});

After(async function (this: MyWorld /*, arg: ITestCaseHookParameter */) {
	console.log('AFTER');

	if (this.browser) {
		await this.browser.close();
		console.log('browser closed');
	}

	if (server) {
		await new Promise((resolve /*, reject */) => {
			// server.close(resolve);
			server.close(() => {
				console.log('server stopped');
				resolve(true);
			});
		});
	}
});

// AfterAll(function () {
// 	console.log('AFTER ALL');
// });
