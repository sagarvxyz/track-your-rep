import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { getBills } from '@functions/readBills';
// import { getVotes } from '@functions/readVotes';
// import { putVotes } from '@functions/writeVotes';
// import { getUsers } from '@functions/readUsers';
// import { putUsers, patchUsers, deleteUsers } from '@functions/writeUsers';
import { updateBills } from '@functions/updateBills';
import { getUpdatedBillsPage } from '@functions/proPublica/getUpdatedBills';
/**
 * Routes incoming HTTP requests to myriad functions. Note: This is only
 * necessary while all functions are wrapped in a single lambda instance.
 * @param event
 * @returns APIGatewayProxyResult
 */

export async function router(
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
	try {
		switch (`${event.httpMethod} ${event.path}`) {
			case 'GET /api/bills':
				// return getBills(event);
				// const offset = Number(event.queryStringParameters.offset) || 0;
				const result = await getUpdatedBillsPage();
				return {
					statusCode: 200,
					body: JSON.stringify(result),
				};
				break;
			case 'GET /api/bills/update':
				return updateBills();
				break;
			// case 'GET /api/votes':
			// 	return getVotes(event);
			// 	break;
			// case 'PUT /api/votes':
			// 	return putVotes(event);
			// 	break;
			// case 'GET /api/users':
			// 	return getUsers(event);
			// 	break;
			// case 'PUT /api/users':
			// 	return putUsers(event);
			// 	break;
			// case 'PATCH /api/users':
			// 	return patchUsers(event);
			// 	break;
			// case 'DELETE /api/users':
			// 	return deleteUsers(event);
			// 	break;
			default:
				return {
					statusCode: 404,
					body: JSON.stringify({
						message: 'router: page does not exist',
					}),
				};
		}
	} catch (err: unknown) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message:
					err instanceof Error
						? `router: ${err.message}`
						: 'router: unknown server error',
			}),
		};
	}
}
