import { v4 as uuid } from '@lukeed/uuid';
import { format } from 'path';

const locals = new Map<string, App.Locals>();

const users = [
	{
		id: 111,
		username: 'mark',
		password: 'password'
	}
];

export function generateCSRFToken(): string {
	return 'csrf.token';
}

export function getUser(username: string, password: string) {
	const user = users.find((next) => next.username === username && next.password === password);
	if (!user) return undefined;

	// Strip out the password (which should be a hash!!!)
	const { password: _, ...rest } = user;
	return { ...rest };
}

export function getLocals(id: string): App.Locals | undefined {
	return locals.get(id);
}

export function getLocalsByLink(link: string): App.Locals | undefined {
	return Array.from(locals.values()).find((next) => {
		return next.link === link;
	});
}

export function createLocals(id: string, data?: any): App.Locals {
	// assert(!locals.has(id));

	// When a user connects from foo.com, they are assigned a session cookie, a link token, and a csrf token.
	// A request is sent to auth.org/auth, which returns a 401, and the html for the login screen.
	// This is sent back the the browser as it it came from foo.com. When the user submits the login
	// format, the request is sent to auth.org, with username, password, csrf token and link token.
	// This request will have the session token for auth.org, but not the one for foo.com.
	// The link token is then used by the backend to find the foo.com session, and mark it as valid.

	const rc = {
		id: id,
		link: uuid(),
		'csrf.token': generateCSRFToken()
		// data
	};

	locals.set(id, rc);

	return rc;
}

export const deleteLocals = (id: string) => {
	locals.delete(id);
};

export const updateLocals = (id: string, data: Partial<App.Locals>) => {
	// assert(!locals.has(id));
	const current = getLocals(id);
	console.log('updateLocals', id, current, data);
	locals.set(id, { ...current, ...data });
};

const loginTokens: Record<string, string> = {};

export const getLoginToken = (sid: string): string => {
	if (!loginTokens[sid]) {
		loginTokens[sid] = 'gerateToken';
	}

	return loginTokens[sid];
};
