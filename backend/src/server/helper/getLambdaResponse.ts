import { APIGatewayProxyResult } from 'aws-lambda';

export function getLambdaResponse(body: any, statusCode = 500) {
	if (typeof data !== 'string') {
		body = JSON.stringify(body);
	}
	const result: APIGatewayProxyResult = {
		statusCode,
		body,
	};
	return result;
}
