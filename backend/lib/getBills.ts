import fetch from 'node-fetch';
import { APIGatewayProxyResult } from 'aws-lambda';
import { getSecrets } from '@lib/getSecrets';

/**
 * Get the latest bills introduced in the House from the ProPublica Congress
 * API.
 * @returns HTTP response or error
 */
export const getLatestBills = async (): Promise<APIGatewayProxyResult> => {
	try {
		const secretResponse = await getSecrets('ProPublicaApi');
		const secret = JSON.parse(secretResponse.body);
		if (!secret || !secret.SecretString) {
			throw Error('no secret found');
		}

		const secretString: ProPublicaSecret = JSON.parse(secret.SecretString);
		const { ProPublicaApiKey, ProPublicaApiUrl } = secretString;

		const response = await fetch(
			ProPublicaApiUrl + '/117/house/bills/introduced.json',
			{
				headers: {
					'X-Api-Key': ProPublicaApiKey,
					'Content-Type': 'application/json',
				},
			}
		);
		const data: ProPublicaResponse | unknown = await response.json();
		if (!data || !Object.keys(data).length) {
			throw Error('empty response');
		}
		return {
			statusCode: 200,
			body: JSON.stringify({
				data,
			}),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message:
					err instanceof Error
						? `fetchBills: ${err.message}`
						: 'fetchBills: some error happened',
			}),
		};
	}
};
