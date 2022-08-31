import type { IWorldOptions } from '@cucumber/cucumber';
import { World } from '@cucumber/cucumber';
import type { Actor } from '@cucumber/screenplay';
import ActorLookup from '@cucumber/screenplay/dist/src/ActorLookup.js';
// import Actor from './Actor'
// import ActorLookup from './ActorLookup'
// import assignTasks from './assignTasks'

export default class ActorWorld extends World {
	public readonly actorLookup = new ActorLookup();

	constructor(props: IWorldOptions) {
		super(props);
		if (this.parameters.tasks) {
			this.assignTasks(this.parameters.tasks);
		}
	}

	assignTasks(tasks: string) {
		console.log('>>>> assignTasks', this, tasks);
	}

	public findOrCreateActor(actorName: string): Actor {
		return this.actorLookup.findOrCreateActor(this, actorName);
	}
}
