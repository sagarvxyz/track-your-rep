/** Global error handler for all try/catch functions. */
export function handleError(error: unknown, location = 'err') {
	const message = errorMessage(error, location);
	console.log(message);
}

export function errorMessage(error: unknown, location = 'error') {
	const message = error instanceof Error ? error.message : String(error);
	return `${location}: ${message}`;
}
