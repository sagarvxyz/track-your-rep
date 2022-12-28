import { APIGatewayProxyEvent } from 'aws-lambda';
import {
	DynamoDBClient,
	PutItemCommand,
	GetItemCommand,
	ScanCommand,
	AttributeValue,
	ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { getProPublicaActiveBills } from '@functions/proPublica/getProPublicaActiveBills';
import { getDynamoDBConfig } from '@functions/misc/devConfig';
import { getErrorMessage } from './misc/getErrorMessage';
import { getLambdaResponse } from './misc/getLambdaResponse';

const config = getDynamoDBConfig();
const client = new DynamoDBClient(config);

/**
 * Upserts all active and missing bills from ProPublica to the database
 */
export async function updateBills() {
	try {
		// Create a map of all active bills in db
		const currentBills = await scanActiveBills();
		const newBills = await getActiveBills();
		console.log(newBills);
		const result = getLambdaResponse('bills updated', 200);
		return result;
		// get the latest introduced date of a bill in the db
		// loop until map size is 0 and a bill is retrieved <= the latest introduced date (set isBeforeLatest = false)
		// 	retrieve all active bills from propublica with an incrementing offset until an inactive bill is found (increment of 20)
		//	loop until batch is complete
		//		check if bill-id maps to a corresponding active bill in db or has a later introduced date than latest
		//		put bill into db
		// 		update map and 'isBeforeLatest' flag
		//	increment offset
	} catch (err: unknown) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message:
					err instanceof Error
						? `updateBillsTable: ${err.message}`
						: 'updateBillsTable: undefined error occured',
			}),
		};
	}
}

/** Return a set of all active bill_id's from the database. */
async function scanActiveBills() {
	try {
		const input: ScanCommandInput = {
			TableName: 'bills_table',
			ExpressionAttributeValues: { ':true': { S: 'true' } },
			ProjectionExpression: 'bill_id, active, introduced_date',
			FilterExpression: 'active = :true',
		};
		const command = new ScanCommand(input);
		const response = await client.send(command);
		const items = response.Items;
		const result: Set<string> = new Set();
		if (items && items.length > 0) {
			for (const item of items) {
				if (item.bill_id['S']) {
					result.add(item.bill_id['S']);
				}
			}
		}
		return result;
	} catch (error) {
		const message = getErrorMessage(error, scanActiveBills.name);
		reportError(message);
	}
}

/** Return an array of all active bills from ProPublica. */
async function getActiveBills() {
	let bills: ProPublicaBill[] = [];
	let isEmptyPage = false;
	let offset = 0;
	// load all active bills from proPublica
	while (!isEmptyPage) {
		const data = await getProPublicaActiveBills(offset * 20);
		if (!data || !data.num_results || !data.bills) {
			isEmptyPage = true;
		} else {
			bills = [...bills, ...data.bills];
			offset++;
		}
	}
	return bills;
}

export async function putBills(event: APIGatewayProxyEvent) {
	try {
		const client = new DynamoDBClient(getDynamoDBConfig());
		const offset = event.queryStringParameters
			? Number(event.queryStringParameters.offset)
			: 0;
		const response = await getBillsProPublica(offset);
		const data: ProPublicaResponse = JSON.parse(response.body);
		const results: ProPublicaResponseResults = data.results[0];

		if (!results.hasOwnProperty('bills')) throw Error('no data returned');
		const bills = results.bills;
		if (!bills || !bills.length) throw Error('no bills returned');

		for (const bill of bills) {
			if (bill.bill_id) {
				// check if bill exists in db with matching JSON string of data.
				const oldRecord = await getRecord(bill.bill_id, 'bills_table');
				const newRecord: Record<string, AttributeValue> = {
					id: { S: `${bill.bill_id}` },
				};
				for (const [key, val] of Object.entries(bill)) {
					const cleanVal = typeof val !== 'string' ? JSON.stringify(val) : val;
					if (oldRecord && oldRecord[key] && oldRecord[key]['S'] !== val) {
						newRecord[key] = { S: cleanVal };
					}
				}
				if (Object.keys(newRecord).length > 1) {
					const command = new PutItemCommand({
						TableName: 'bills_table',
						Item: {
							...newRecord,
						},
					});
					await client.send(command);
				}
			}
		}
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `putBills: records updated`,
			}),
		};
	} catch (err: unknown) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message:
					err instanceof Error
						? `putBills: ${err.message}`
						: 'putBills: some error happened',
			}),
		};
	}
}

async function getRecord(id: string, table: string) {
	try {
		const data: AttributeValue = { S: id };
		const client = new DynamoDBClient(getDynamoDBConfig());
		const command = new GetItemCommand({
			TableName: table,
			Key: { id: data },
		});
		const response = await client.send(command);
		return response.Item;
	} catch (err: unknown) {
		throw Error('checkForRecord failed');
	}
}
