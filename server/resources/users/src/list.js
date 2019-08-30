/* eslint-disable no-unused-vars */
import * as dynamoDbLib from '../../utils/dynamodb-lib';
import { success, failure } from '../../utils/response-lib';

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context) {
  const params = {
    TableName: process.env.userTable,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: {
      ':userID': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
