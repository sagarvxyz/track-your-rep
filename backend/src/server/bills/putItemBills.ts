import {
	AttributeValue,
	DynamoDBClient,
	PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { getDynamoDBConfig } from '../helper/devConfig';
import { getErrorMessage } from '../helper/getErrorMessage';

export async function putItemBills(bills: ProPublicaBill[]) {
	try {
		const client = new DynamoDBClient(getDynamoDBConfig());
		for (const bill of bills) {
			if (bill.bill_id) {
				const Item: Record<string, AttributeValue> = {
					id: { S: `${bill.bill_id}` },
				};
				for (const [key, val] of Object.entries(bill)) {
					const cleanVal = typeof val !== 'string' ? JSON.stringify(val) : val;
					Item[key] = { S: cleanVal };
				}
				if (Object.keys(Item).length > 1) {
					const command = new PutItemCommand({
						TableName: 'bills_table',
						Item,
					});
					await client.send(command);
				}
			}
		}
		console.log('putItemBills completed');
	} catch (error) {
		const message = getErrorMessage(error, putItemBills.name);
		console.log(message);
	}
}
