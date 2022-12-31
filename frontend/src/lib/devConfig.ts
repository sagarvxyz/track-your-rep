export function getDevConfig(type: string) {
	const isDev = import.meta.env.DEV;
	let result;
	if (type === 'url') {
		result = isDev ? 'http://127.0.0.1:3000' : 'https://www.trackyourrep.com';
	}
	return result;
}
