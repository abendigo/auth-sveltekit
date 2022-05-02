<script lang="ts">
	export let token: string;

	let username = '';
	let password = '';
	let error = '';

	let promise: Promise<any>;

	async function validate() {
		console.log({ username, password, token });
		// const response = await fetch('/auth/login', {
		const response = await fetch('/login', {
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
		});
		console.log(response);
		const json = await response.json();
		console.log(json);

		if (json.code === 200) {
			location.reload();
		}

		return json.error;
	}

	function submitHandler() {
		promise = validate();
	}
</script>

<div class="login-form">
	<h1>Login Form</h1>

	<form method="post" on:submit|preventDefault={submitHandler}>
		<input type="text" name="username" placeholder="Username" bind:value={username} required />
		<input type="password" name="password" placeholder="Password" bind:value={password} required />
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
