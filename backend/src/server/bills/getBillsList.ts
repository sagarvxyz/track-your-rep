import {
	DynamoDBClient,
	QueryCommandInput,
	ScanCommand,
	ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getDynamoDBConfig } from '../helper/devConfig';
import { lambdaResponse } from '../helper/lambdaResponse';
import { readQueryItems } from '../helper/readQueryItems';

/** Return an array of all ids in the bills_table. */
export async function getBillsList(event: APIGatewayProxyEvent) {
	try {
		if (
			!event ||
			!event.queryStringParameters ||
			!event.queryStringParameters.type
		) {
			throw Error('invalid request, missing bill_id in querystring');
		}
		const query = event.queryStringParameters.type;
		const client = new DynamoDBClient(getDynamoDBConfig());
		const input: ScanCommandInput = {
			TableName: 'bills_table',
		};
		const command = new ScanCommand(input);
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
