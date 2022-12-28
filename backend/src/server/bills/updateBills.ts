import { APIGatewayProxyEvent } from 'aws-lambda';
import {
	DynamoDBClient,
	PutItemCommand,
	GetItemCommand,
	ScanCommand,
	AttributeValue,
	ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { getUpdatedBillsPage } from 'src/server/bills/getPPUpdatedBillsPage';
import { getDynamoDBConfig } from 'src/server/helper/devConfig';
import { getErrorMessage } from '../helper/getErrorMessage';
import { getLambdaResponse } from '../helper/getLambdaResponse';
import { putItemBills } from './putItemBills';

const config = getDynamoDBConfig();
const client = new DynamoDBClient(config);

/**
 * Upserts all active and missing bills from ProPublica to the database
 */
export async function updateBills() {
	try {
		// Create a map of all active bills in db
		const response = await getUpdatedBillsPage();
		if (!response || !response.bills) {
			throw Error('invalid response from getPPUpdatedBillsPage');
		}
		const data = response.bills;
		await putItemBills(data);
		const result = getLambdaResponse(data, 200);
		return result;
	} catch (error) {
		const message = getErrorMessage(error, updateBills.name);
		console.log(message);
	}
}
