import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const putBills = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'putBills worked',
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

export const patchBills = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'patchBills worked',
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
