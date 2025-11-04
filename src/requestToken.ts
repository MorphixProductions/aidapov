export async function requestToken(
	ip: string,
	username: string,
	password: string
) {
	const endPoint = `http://${ip}/cgi-bin/web.fcgi?func=get`;
	const body = { key: null, system: { login: `${username}:${password}` } };

	const request = await fetch(endPoint, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	const response = await request.json();

	const valid =
		response?.key !== false &&
		response?.system !== false &&
		response?.status !== false;

	if (!valid) return { valid: false };

	return { valid: true, login: response.system.login };
}
