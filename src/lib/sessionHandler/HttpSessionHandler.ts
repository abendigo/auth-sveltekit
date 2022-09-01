import type { LoginSessionHandler } from '../screens/login.session';
import { HttpLoginSessionHandler } from '../screens/login.session';

export class HttpSessionHandler {
  // fetch: any;
	login: LoginSessionHandler;

	constructor(fetch: any, baseUrl: string) {
    // this.fetch = fetch;
		this.login = new HttpLoginSessionHandler(fetch, baseUrl);
	}
}
