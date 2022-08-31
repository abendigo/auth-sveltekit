import express from 'express';
import request from 'request';

const app = express();
const port = 3210;

app.get('/test/forwardauth/:domain', async (req, res) => {
	const baseUrl = 'http://localhost:3000';

	const url = `${baseUrl}/auth`;
	// const rr = await fetch(url);
	// console.log('=======================================');
	// console.log(rr);
	// console.log('=======================================');

	// if (rr.ok) {
	// 	res.end('ok');
	// } else {
	// 	res.end('not ok');
	// }

	request
		.get(url, {
			headers: {
				'x-forwarded-method': 'GET',
				'x-forwarded-uri': req.params.domain
			}
		})
		.pipe(res);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
