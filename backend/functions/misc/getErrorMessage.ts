export function getErrorMessage(error: unknown, location = 'err') {
	const message = error instanceof Error ? error.message : String(error);
	return `${location}: ${message}`;
}
