import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const putUsers = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'putUsers worked',
				event,
			}),
		};
	} catch (err: unknown) {
		console.log(err);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: err instanceof Error ? err.message : 'some error happened',
			}),
		};
	}
	return response;
};

export const patchUsers = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'patchUsers worked',
				event,
			}),
		};
	} catch (err: unknown) {
		console.log(err);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: err instanceof Error ? err.message : 'some error happened',
			}),
		};
	}
	return response;
};

export const deleteUsers = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'deleteUsers worked',
				event,
			}),
		};
	} catch (err: unknown) {
		console.log(err);
		response = {
			statusCode: 500,
			body: JSON.stringify({
				message: err instanceof Error ? err.message : 'some error happened',
			}),
		};
	}
	return response;
};
