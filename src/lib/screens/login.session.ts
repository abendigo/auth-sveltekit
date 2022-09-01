import { SessionHandler } from '../sessionHandler/SessionHandler.js';

export abstract class LoginSessionHandler extends SessionHandler {
	abstract validate(username: string, password: string, token: string): void;
}

export class HttpLoginSessionHandler extends LoginSessionHandler {
  fetch: any;

  constructor(fetch: any, baseUrl: string) {
    super(baseUrl);

    this.fetch = fetch;
  }

	async validate(username: string, password: string, token: string) {
		return this.fetch(`${this.baseUrl}/login`, {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				token
			})
		}).then((response: any) => {
			return response.json();
		});
		// .catch((error) => {
		// 	console.log('================================');
		// 	console.log(error);
		// 	console.log('================================');
		// });
	}
}
