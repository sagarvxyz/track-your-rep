import { getErrorMessage } from '../helper/getErrorMessage';
import { getSecrets } from '../helper/getSecrets';
import fetch from 'node-fetch';

/**
 * Get all bills with updates from now to the input minDate from the ProPublica Congress
 * API.
 * Note: need to add logic to handle dates
 */
export async function getUpdatedBillsPage(offset = 0) {
	try {
		if (offset % 20 > 0) {
			throw Error('input must be an integer of 0 or a multiple of 20');
		}
		const secret = await getProPublicaSecret();
		if (!secret) {
			throw Error('invalid secret');
		}
		const { ProPublicaApiKey, ProPublicaApiUrl } = secret;
		const params = new URLSearchParams({
			offset: `${offset}`,
		}).toString();
		const response = await fetch(
			ProPublicaApiUrl + '/117/house/bills/updated.json?' + params,
			{
				headers: {
					'X-Api-Key': ProPublicaApiKey,
					'Content-Type': 'application/json',
				},
			}
		);
		const data: ProPublicaResponse =
			(await response.json()) as ProPublicaResponse;
		if (!data || !data.results) {
			throw Error('incorrect response shape');
		}
		const results: ProPublicaResponseResults = data.results[0];
		if (!results) throw Error('no results');
		return results;
	} catch (error) {
		const message = getErrorMessage(error, 'getProPublicaActiveBills');
		console.log(message);
	}
}

async function getProPublicaSecret() {
	try {
		const secret = await getSecrets('ProPublicaApi');
		if (!secret || !secret.SecretString) {
			throw Error('no secret found');
		}
		const secretString: ProPublicaSecret = JSON.parse(secret.SecretString);
		return secretString;
	} catch (error) {
		const message = getErrorMessage(error);
		reportError(message);
	}
}
