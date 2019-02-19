const AWS = require("aws-sdk");

module.exports =(user_id,user_name) => {
    let awsConfig = {
        "region": "us-east-2",
        "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
        "accessKeyId": "",
        "secretAccessKey": ""
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();

    let save = function (user_id, user_name) {

        let input = {
            "user_id": user_id,
            "userName": user_name,
            "usedOnSec": new Date().getSeconds().toString(),
            "usedOnMin": new Date().getMinutes().toString()
        };
        let params = {
            TableName: "users",
            Item: input
        };
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("save::error - " + JSON.stringify(err, null, 2));
            } else {
                console.log("save::success");
            }
        });
    };
    save(user_id,user_name);
};
