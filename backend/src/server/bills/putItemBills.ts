import {
	AttributeValue,
	DynamoDBClient,
	PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { getDynamoDBConfig } from '../helper/devConfig';
import { getAttributeValue } from '../helper/getAttributeValue';
import { handleError } from '../helper/handleError';

export async function putItemBills(bills: ProPublicaBill[]) {
	try {
		const client = new DynamoDBClient(getDynamoDBConfig());
		for (const bill of bills) {
			if (bill.bill_id) {
				const Item: Record<string, AttributeValue> = {
					id: { S: `${bill.bill_id}` },
				};

				for (const [key, value] of Object.entries(bill)) {
					if (typeof key !== 'string') continue;
					const attribute = getAttributeValue(value);
					const record: Record<string, Record<string, AttributeValue>> = {};
					record[key] = attribute;
					Object.assign(Item, record);
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
		console.log('putItemBills success');
	} catch (error) {
		return handleError(error, putItemBills.name);
	}
}
