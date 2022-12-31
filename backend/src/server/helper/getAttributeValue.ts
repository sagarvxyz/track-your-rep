import { AttributeValue } from '@aws-sdk/client-dynamodb';

export function getAttributeValue(value: any) {
	let name = '';
	switch (true) {
		case typeof value === 'string':
			name = 'S';
			break;
		case typeof value === 'boolean':
			name = 'BOOL';
			break;
		case Array.isArray(value):
			value = value.map((entry: any) =>
				typeof entry === 'string' ? entry : JSON.stringify(entry)
			);
			name = 'SS';
			break;
		case value instanceof Map:
			name = 'M';
			break;
		case typeof value === 'number':
			name = 'N';
			break;
		default:
			name = 'S';
			value = JSON.stringify(value);
	}
	const result: Record<string, AttributeValue> = {};
	result[name] = value;
	return result;
}
