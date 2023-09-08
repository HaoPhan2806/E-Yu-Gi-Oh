const sql = require('./sql');

function detailblog(MATT, res){
    sql.executeSQL(`select * from DetailBlog where MATT = ${MATT}`, (recordset) => {
        var row = recordset.recordsets[0][0];
           res.send(row);
    });
}
module.exports = {
    detailblog: detailblog
}