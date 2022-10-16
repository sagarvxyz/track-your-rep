import { SecretsManager } from 'aws-sdk';

/**
 * Returns a Secret from the AWS Secrets Manager. See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html.
 * @param SecretId - The name given to a secret stored in the AWS Secrets
 * Manager.
 * @returns object containing facts about an AWS Secret
 */
export const getSecrets = async (
	SecretId: string
): Promise<SecretsManager.GetSecretValueResponse | undefined> => {
	try {
		const env = new SecretsManager();
		const params = { SecretId };
		const secret = await env.getSecretValue(params).promise();
		return secret;
	} catch (err: unknown) {
		console.log(err);
	}
};
