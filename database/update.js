const AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "",
    "secretAccessKey": ""};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let modify = function (user_id) {
    let params = {
        TableName: "users",
        Key: {"user_id": user_id},
        UpdateExpression: "set updated_by = :byUser, " +
            "usedOn = :stringValue",
        ExpressionAttributeValues: {
            ":byUser": "updateUser",
            ":stringValue": new Date().toString()
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function (err, data) {
        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success "+JSON.stringify(data) );
        }
    });
};
modify();