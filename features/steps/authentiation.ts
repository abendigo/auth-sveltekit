import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

import { defineParameterType, setWorldConstructor } from '@cucumber/cucumber';
import { ActorWorld, ActorParameterType } from '@cucumber/screenplay';
import type { Actor } from '@cucumber/screenplay';

// import { isAuthenticated, login } from '../support/tasks/session/login.js';
// import { isAuthenticated, login } from '../support/tasks/http/login.js';
// import { isAuthenticated, login } from '../support/tasks/dom/login.js';
// import { isAuthenticated, login } from '../../dist/dom-tasks.es.js';
// import { isAuthenticated, login } from '../support/tasks/fullstack/login.js';

import type { RequestHandlerOutput, ResponseBody } from '@sveltejs/kit';
import type World from '../support/world';

Given('{actor} is at the Login Screen', async function (actor) {
	// Write code here that turns the phrase above into concrete actions
	// return 'pending';
	// await actor.attemptsTo()
});

When('{actor} enters valid credentials', async function (this: World, actor: Actor<World>) {
	actor.remember('username', 'mark');

	// console.log('>>>> valid credentials', this, actor.world);

	const response: RequestHandlerOutput = await actor.attemptsTo(this.login('mark', 'password'));

	actor.remember('response', response);
});

When('{actor} enters invalid credentials', async function (this: World, actor: Actor) {
	actor.remember('username', 'username');

	// console.log('>>>> invalid credentials', this, actor.world);

	const response: RequestHandlerOutput = await actor.attemptsTo(this.login('username', 'password'));

	actor.remember('response', response);
});

Then('{actor} should be shown a success message', function (this: World, actor: Actor) {
	// const response: RequestHandlerOutput<Record<string, number>> = actor.recall('response');
	// const body: ResponseBody = response.body;
	// const { code } = body as unknown as { code: number };
	// assert.equal(response.status, 200);
	// assert.equal(code, 200);
});

Then('{actor} should be shown an error message', function (this: World, actor: Actor) {
	// const response: RequestHandlerOutput = actor.recall('response');
	// const body: ResponseBody = response.body;
	// const { code } = body as unknown as { code: number };
	// assert.equal(response.status, 200);
	// assert.equal(code, 401);
});

Then('{actor} should be authenticated', async function (this: World, actor: Actor) {
	const authenticated = await actor.ask(this.isAuthenticated(actor.recall('username')));
	assert.equal(authenticated, true);
});

Then('{actor} should not be authenticated', async function (this: World, actor: Actor) {
	const authenticated = await actor.ask(this.isAuthenticated(actor.recall('username')));
	assert.equal(authenticated, false);
});
