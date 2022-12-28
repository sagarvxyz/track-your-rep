import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

function checkLocal() {
	console.log(process.env);
	return process.env.AWS_SAM_LOCAL;
}

export function getDynamoDBConfig() {
	const isLocal = checkLocal();
	const region = 'us-east-1';
	const endpoint = 'http://host.docker.internal:8000';
	let result: DynamoDBClientConfig = { region };
	if (isLocal) {
		result = { ...result, endpoint };
	}
	return result;
}

export function getAPIHost() {
	const isLocal = checkLocal();
	const result: URL = new URL(
		isLocal
			? 'http://host.docker.internal:3000'
			: 'https://www.trackyourrep.com'
	);
	return result.toString();
}
