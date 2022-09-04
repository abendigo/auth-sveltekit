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
		console.log('>>>> validate', this.baseUrl, username, password);
		return (
			this.fetch(`${this.baseUrl}/login`, {
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
			})
				.then(async (response: any) => {
					console.log('>>>>> response', response.status, response.statusText);
					const body = await response.text();
					console.log('>>>> body', body);
					// return response.json();
				})
				// .then((json: any) => {
				// 	console.log('>>>> json', json);
				// 	return json;
				// })
				.catch((error: any) => {
					console.log('================================');
					console.log(error);
					console.log('================================');
				})
		);
	}
}
