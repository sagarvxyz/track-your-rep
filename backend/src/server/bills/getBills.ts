import {
	DynamoDBClient,
	QueryCommand,
	QueryCommandInput,
} from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getDynamoDBConfig } from '../helper/devConfig';
import { lambdaResponse } from '../helper/lambdaResponse';
import { readQueryItems } from '../helper/readQueryItems';

/** Get bill data by bill_id from the database. */
export async function getBills(event: APIGatewayProxyEvent) {
	try {
		if (
			!event ||
			!event.queryStringParameters ||
			!event.queryStringParameters.bill_id
		) {
			throw Error('invalid request, missing bill_id in querystring');
		}
		const query = event.queryStringParameters.bill_id;
		const client = new DynamoDBClient(getDynamoDBConfig());
		const input: QueryCommandInput = {
			TableName: 'bills_table',
			ExpressionAttributeNames: { '#id': 'id' },
			ExpressionAttributeValues: { ':id': { S: query } },
			KeyConditionExpression: '#id = :id',
		};
		const command = new QueryCommand(input);
		const response = await client.send(command);
		let data: Record<string, any>[] = [];
		if (response.Items) {
			data = readQueryItems(response);
		}
		const results = { results: data };
		return lambdaResponse(results, 200);
	} catch (error) {
		return lambdaResponse(error, 500);
	}
}
