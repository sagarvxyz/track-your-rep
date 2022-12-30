import { APIGatewayProxyEvent } from 'aws-lambda';
import { getPPUpdatedBillsPage } from 'src/server/bills/getPPUpdatedBillsPage';
import { lambdaResponse } from '../helper/lambdaResponse';
import { putItemBills } from './putItemBills';

/** Upserts all active and missing bills from ProPublica to the database. */
export async function updateBills(event: APIGatewayProxyEvent) {
	try {
		const response = await getPPUpdatedBillsPage();
		if (!response || !response.bills) {
			throw Error('invalid response from getPPUpdatedBillsPage');
		}
		const data = response.bills;
		await putItemBills(data);
		const result = data.map((bill) => bill.bill_id);
		return lambdaResponse(result, 200);
	} catch (error) {
		return lambdaResponse(error, 500);
	}
}
