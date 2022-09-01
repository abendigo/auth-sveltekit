import { RequestEvent } from '@sveltejs/kit/types/private';
import { LoginSessionHandler } from '../../../../src/lib/screens/login.session';

import { post } from '../../../../src/routes/login/index.js';

export class DomainLoginSessionHandler extends LoginSessionHandler {
	async validate(username: string, password: string, token: string) {
		console.log('==== dom login validate ====', username, password, token);
		console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=- kkkkkkkkkkkkkk');

		// return sessionLogin(username, password);

		const request: Request = {
			json: async () => {
				return { username, password, token };
			}
		} as unknown as Request;

		const requestEvent: RequestEvent = {
			request
		} as unknown as RequestEvent;

		return post(requestEvent);
		// console.log('=== calling post ====');
		// const response = await post(requestEvent);
		// console.log('=== response ===', response);
	}
}
