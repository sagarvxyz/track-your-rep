import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpStatus } from 'aws-sdk/clients/lambda';
import { errorMessage, handleError } from './handleError';

/** Reports errors and returns an HTTP response as an AWS APIGatewayProxyResult. */
export function lambdaResponse(input: any, statusCode: HttpStatus) {
	let body = input;
	if (input instanceof Error) {
		body = errorMessage(body);
		handleError(body);
	}
	if (typeof body !== 'string') {
		body = JSON.stringify(body);
	}
	const result: APIGatewayProxyResult = {
		statusCode,
		body,
	};
	return result;
}
