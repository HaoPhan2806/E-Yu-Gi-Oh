const sql = require('./sql');

function loginIndex(userName,pass,cb){
    sql.executeSQL(`select * from NguoiDung where Name = '${userName}' and Pass = '${pass}'`, (recordset) => {
        cb(recordset.recordsets[0]);
    }); 
}



module.exports = {
    loginIndex: loginIndex,
}