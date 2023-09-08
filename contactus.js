const sql = require('./sql');

function contactus(Name, Phone, Email, NoidungLH, cb){
    sql.executeSQL(`insert into ContactUs(Name, Phone, Email, NoidungLH) values(N'${Name}','${Phone}',N'${Email}', N'${NoidungLH}')`, (recordset) => {
        cb(recordset.recordsets[0]);
    }); 
}

module.exports = {
    contactus: contactus
}