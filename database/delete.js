const AWS = require("aws-sdk");
module.exports = (user_id) => {
    let awsConfig = {
        "region": "us-east-2",
        "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
        "accessKeyId": "",
        "secretAccessKey": ""
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();

    let remove = function (user_id) {

        let params = {
            TableName: "users",
            Key: {
                "user_id": user_id
            }
        };
        docClient.delete(params, function (err, data) {

            if (err) {
                console.log("users::delete::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("users::delete::success");
            }
        });
    };
    remove(user_id);
};