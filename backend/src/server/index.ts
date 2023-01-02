import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateBills } from 'src/server/bills/updateBills';
import { getBills } from './bills/getBills';
import { getBillsList } from './bills/getBillsList';
/**
 * Routes incoming HTTP requests to myriad functions. Note: This is only
 * necessary while all functions are wrapped in a single lambda instance.
 */
export async function router(
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
	try {
		switch (`${event.httpMethod} ${event.path}`) {
			case 'GET /api/bills':
				return getBills(event);
				break;
			case 'GET /api/bills/update':
				return updateBills(event);
				break;
			case 'GET /api/bills/list':
				return getBillsList(event);
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
