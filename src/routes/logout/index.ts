import type { RequestEvent } from '@sveltejs/kit/types/private';
import type { RequestHandlerOutput } from '@sveltejs/kit';
// import { setConnected } from '../../lib/store';

export async function get(event: RequestEvent): Promise<RequestHandlerOutput> {
	console.log('LOGOUT');
	// setConnected(false);

	return {
		body: {
			x: 'y'
		}
	};
}
