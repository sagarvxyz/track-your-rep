import { getSecrets } from '@functions/misc/getSecrets';
import { URLSearchParams } from 'url';
import { getErrorMessage } from '@functions/misc/getErrorMessage';

/**
 * Get the latest bills introduced in the House from the ProPublica Congress
 * API.
 */
export async function getProPublicaActiveBills(offset = 0) {
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
			ProPublicaApiUrl + '/117/house/bills/active.json?' + params,
			{
				headers: {
					'X-Api-Key': ProPublicaApiKey,
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		if (!data || !data.results) {
			throw Error('incorrect response shape');
		}
		const results: ProPublicaResponseResults = data.results;
		return results;
	} catch (error) {
		const message = getErrorMessage(error, 'getProPublicaActiveBills');
		reportError(message);
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
