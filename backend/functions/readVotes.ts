import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const getVotes = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'getVotes worked',
				event,
			}),
		};
	} catch (err: unknown) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: err instanceof Error ? err.message : 'some error happened',
			}),
		};
	}
};
