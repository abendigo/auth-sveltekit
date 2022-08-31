import type { LoginSessionHandler } from '../screens/login.session';
import { HttpLoginSessionHandler } from '../screens/login.session';

export class HttpSessionHandler {
	login: LoginSessionHandler;

	constructor(baseUrl: string) {
		this.login = new HttpLoginSessionHandler(baseUrl);
	}
}
