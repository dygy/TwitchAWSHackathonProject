const deleteDB = require ('../database/delete');
module.exports =(users)=>{
    for (let x=0;x<users.length;x++){
        deleteDB(users[x].toString())
    }
};