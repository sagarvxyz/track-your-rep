import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
	AttributeValue,
	DynamoDBClient,
	GetItemCommand,
} from '@aws-sdk/client-dynamodb';

export const getBills = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const params = event.queryStringParameters;
		if (!params || !params.bill_id) {
			throw Error('missing bill_id in query parameters');
		}
		const data: AttributeValue = { S: params.id };
		const client = new DynamoDBClient({ region: 'us-east-1' });
		const command = new GetItemCommand({
			TableName: 'bills_table',
			Key: { id: data },
		});
		const response = await client.send(command);
		return {
			statusCode: 200,
			body: JSON.stringify(response),
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
