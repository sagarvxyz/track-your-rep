import { AttributeValue, QueryCommandOutput } from '@aws-sdk/client-dynamodb';

//** Return an array of objects from the results of a DynamoDB query. */
export function readQueryItems(input: QueryCommandOutput) {
	if (!input.Items) {
		throw Error('invalid input, missing Items');
	}
	const items = input.Items;
	const results: Record<string, any> = [];
	for (const item of items) {
		if (!item.id) continue;
		const result = readAttributeValues(item);
		results.push(result);
	}
	return results;
}

/** Returns JavaScript data structures from DynamoDB attributes in a query. */
function readAttributeValues(record: Record<string, AttributeValue>) {
	const result: Record<string, any> = {};
	for (const [key, attribute] of Object.entries(record)) {
		const [name, value] = Object.entries(attribute)[0];
		switch (name) {
			case 'S':
				result[key] = value;
				break;
		}
	}
	return result;
}
