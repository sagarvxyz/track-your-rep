import { SecretsManager } from 'aws-sdk';
import { handleError } from './handleError';

/**
 * Returns a Secret from the AWS Secrets Manager. See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html.
 */
export async function getSecrets(SecretId: string) {
	try {
		const env = new SecretsManager();
		const params = { SecretId };
		const secret = await env.getSecretValue(params).promise();
		return secret;
	} catch (error) {
		return handleError(error, getSecrets.name);
	}
}
