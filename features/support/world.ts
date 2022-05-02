import {
	defineParameterType,
	setWorldConstructor,
	Before,
	BeforeAll,
	After,
	AfterAll
} from '@cucumber/cucumber';
import type { ITestCaseHookParameter, IWorldOptions } from '@cucumber/cucumber';
import { ActorWorld, ActorParameterType } from '@cucumber/screenplay';

import { createStore, getStore } from '../../src/lib/store.js';

import { chromium, webkit } from 'playwright';
import type { Browser } from 'playwright';

// (async () => {
// 	const browser = await chromium.launch({ headless: false, sloMo: 100 });
// 	const page = await browser.newPage();
// 	await page.goto('http://whatsmyuseragent.org/');
// 	await page.screenshot({ path: `example.png` });
// 	await browser.close();
// })();

// Define an {actor} parameter type that creates Actor objects
defineParameterType(ActorParameterType);

// Define your own World class that extends from ActorWorld
export default class World extends ActorWorld {
	browser: Browser | undefined;
	store: any;

	constructor(props: IWorldOptions) {
		super(props);
		console.log('world constructor');
	}
}
setWorldConstructor(World);

BeforeAll(function (done: any) {
	console.log('BEFORE ALL w/DONE');
	done();
});

BeforeAll(async function () {
	console.log('BEFORE ALL');

	// if (this.parameters.session === 'HttpSession') {
	// }
});

// import { handler } from '../../build/handler.js';
import express from 'express';
let server: { close: any };

// let browser: import('playwright').Browser;
let browser: Browser;

// let page: import('playwright').Page;

// var globalString: string;

Before(async function (this: World, arg: ITestCaseHookParameter) {
	console.log('BEFORE');

	if (this.parameters.session === 'FullStack') {
		browser = await chromium.launch({ headless: false, slowMo: 100 });
		// const page = await browser.newPage();
		// await page.goto('http://whatsmyuseragent.org/');

		this.browser = browser;
		console.log('browser openned');
	}

	if (this.parameters.session === 'Dom') {
	}

	if (
		this.parameters.session === 'HttpSession' ||
		this.parameters.session === 'Dom' ||
		this.parameters.session === 'FullStack'
	) {
		let { handler } = await import('../../build/handler.js');

		// @ts-expect-error
		this.store = globalThis.forwardAuthStore = createStore();
		// this.store = getStore();

		const app = express();
		// add a route that lives separately from the SvelteKit app
		// app.get('/healthcheck', (req, res) => {
		// 	res.end('ok');
		// });

		app.use(handler);

		const p = new Promise((resolve, reject) => {
			server = app.listen(3000, () => {
				console.log('listening on port 3000');
				resolve(true);
			});
		});
		await p;
	}
});

After(async function (this: World, arg: ITestCaseHookParameter) {
	console.log('AFTER');

	if (this.browser) {
		await this.browser.close();
		console.log('browser closed');
	}

	if (server) {
		await new Promise((resolve, reject) => {
			server.close(() => {
				console.log('server stopped');
				resolve(true);
			});
		});
	}
});
AfterAll(function () {
	console.log('AFTER ALL');
});
