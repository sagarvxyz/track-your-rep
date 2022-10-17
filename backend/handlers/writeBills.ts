import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { getLatestBills } from '@lib/getBills';
import { AnyARecord } from 'dns';

export const putBills = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const client = new DynamoDBClient({ region: 'us-east-1' });
		const response = await getLatestBills();
		const data: ProPublicaResponse = JSON.parse(response.body);
		const results: ProPublicaResponseResults = data.results[0];
		if (!results.hasOwnProperty('bills')) throw Error('no data returned');
		const bills = results.bills;
		if (!bills || !bills.length) throw Error('no bills returned');

		for (const bill of bills) {
			if (bill.bill_id) {
				const items: Record<string, any> = {
					id: { S: bill.bill_id },
				};
				for (const [key, val] of Object.entries(bill)) {
					items[key] = { S: val };
				}

				const command = new PutItemCommand({
					TableName: 'BillsTable',
					Item: {
						...items,
					},
				});
				await client.send(command);
			}
		}
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'putBills worked',
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

export const patchBills = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'patchBills worked',
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
