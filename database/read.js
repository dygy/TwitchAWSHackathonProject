const AWS = require("aws-sdk");
let  user = require('../models/user');
module.exports =(user_id) => {
    let awsConfig = {
        "region": "us-east-2",
        "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
        "accessKeyId": "",
        "secretAccessKey": ""};
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();

    let fetchOneByKey = function (user_id) {
        let params = {
            TableName: "users",
            Key: {
                "user_id": user_id
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
                return null;
            } else {
       //         console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
       //         console.log(data.Item);
                user['user_id']=data.Item["user_id"];
                user['userName']=data.Item['userName'];
                user['usedOnSec']=data.Item['usedOnSec'];
                user['usedOnMin']=data.Item['usedOnMin'];
            }
        })
    };
    fetchOneByKey(user_id);
};
