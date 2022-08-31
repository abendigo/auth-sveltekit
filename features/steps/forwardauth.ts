import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

import { defineParameterType, setWorldConstructor } from '@cucumber/cucumber';
import { ActorWorld, ActorParameterType } from '@cucumber/screenplay';
import type { Actor } from '@cucumber/screenplay';
import type World from '../support/world.js';

import { visit } from '../support/tasks/session/visit.js';
// import { authenticate, visit } from '../support/tasks/http/visit.js';
// import { authenticate, visit } from '../support/tasks/fullstack/visit.js';

import type { RequestHandlerOutput } from '@sveltejs/kit';

// Define an {actor} parameter type that creates Actor objects
// defineParameterType(ActorParameterType);

Given('{actor} is authenticated', function (actor: Actor) {
	actor.remember('authenticated', true);
});

Given('{actor} is not authenticated', function (actor: Actor) {
	actor.remember('authenticated', false);
});

When('{actor} visits foo.com', async function (actor: Actor<World>) {
	const response: RequestHandlerOutput = await actor.attemptsTo(visit('foo.com'));

	actor.remember('response', response);
});

Then('{actor} should be asked to authenticate', function (actor: Actor) {
	const response: RequestHandlerOutput = actor.recall('response');

	assert.equal(response.status, 401);
});

Then('{actor} should be allowed to proceed', function (actor: Actor) {
	const response: RequestHandlerOutput = actor.recall('response');

	assert.equal(response.status, 200);
});
