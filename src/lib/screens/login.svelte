<script lang="ts">
	import type { LoginSessionHandler } from './login.session';

	export let token: string;
	export let session: LoginSessionHandler;

	console.log('session', session);

	let username = '';
	let password = '';
	let error = '';

	let promise: Promise<any>;

	async function validate(username: string, password: string, token: string) {
		console.log('=== session ===', session);

		const json = await session.validate(username, password, token);

		if (json.code === 200) {
			location.reload();
		}

		return json.error;
	}

	function submitHandler() {
		promise = validate(username, password, token);
	}
</script>

<div class="login-form">
	<h1>Login Form</h1>

	<form method="post" on:submit|preventDefault={submitHandler}>
		<label for="username">Username</label>
		<input
			aria-label="username"
			type="text"
			name="username"
			placeholder="Username"
			bind:value={username}
			required
		/>
		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			name="password"
			placeholder="Password"
			bind:value={password}
			required
		/>
		<input type="text" name="token" value={token} readonly />
		<div>{error}</div>
		<input type="submit" />
	</form>
</div>

{#if promise === undefined}
	<p />
{:else}
	{#await promise}
		<div><span>Logging in...</span></div>
	{:then value}
		<div><span>{value}</span></div>
	{:catch error}
		<div><span>{error.message}</span></div>
	{/await}
{/if}

<!-- <a href="/cookie">Set Cookie</a> -->

<!-- https://codeshack.io/basic-login-system-nodejs-express-mysql/ -->
<style>
	.login-form {
		width: 300px;
		margin: 0 auto;
		font-family: Tahoma, Geneva, sans-serif;
	}
	.login-form h1 {
		text-align: center;
		color: #4d4d4d;
		font-size: 24px;
		padding: 20px 0 20px 0;
	}
	.login-form input[type='password'],
	.login-form input[type='text'] {
		width: 100%;
		padding: 15px;
		border: 1px solid #dddddd;
		margin-bottom: 15px;
		box-sizing: border-box;
	}
	.login-form input[type='submit'] {
		width: 100%;
		padding: 15px;
		background-color: #535b63;
		border: 0;
		box-sizing: border-box;
		cursor: pointer;
		font-weight: bold;
		color: #ffffff;
	}
</style>
