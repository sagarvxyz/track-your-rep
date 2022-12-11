import { APIGatewayProxyResult } from 'aws-lambda';
import { SecretsManager } from 'aws-sdk';

/**
 * Returns a Secret from the AWS Secrets Manager. See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html.
 * @param SecretId - The name given to a secret stored in the AWS Secrets
 * Manager.
 * @returns object containing facts about an AWS Secret
 */
export const getSecrets = async (
	SecretId: string
): Promise<APIGatewayProxyResult> => {
	try {
		const env = new SecretsManager();
		const params = { SecretId };
		const secret = await env.getSecretValue(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(secret),
		};
	} catch (err: unknown) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message:
					err instanceof Error
						? `getSecrets: ${err.message}`
						: 'getSecrets: some error happened',
			}),
		};
	}
};
