const readDB = require ('../database/read'),
    writeDB = require ('../database/write');
let  user = require('../models/user'),
     message = require('../models/message');
module.exports =(user_id,user_name) =>{
    readDB(user_id);
    if (user['user_id'] !== user_id) {
        writeDB(user_id, user_name);
        message['firstTime']=true;
    }
    else {
        let rightNow = new Date();
        if ((rightNow.getMinutes() - parseInt(user['usedOnMin'], 10)) < 1
            &&
            (rightNow.getSeconds() - parseInt(user['usedOnSec'], 10)) < 3) {
            message['accepted']=false
        }
        else {
            writeDB(user_id, user_name);
        }
    }
};