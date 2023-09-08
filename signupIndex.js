const sql = require('./sql');

function signupIndex(userName, pass, passauth, HoTenND, Email, SDT, Diachi, ThanhPho, cb){
    sql.executeSQL(`insert into NguoiDung(Name, Pass, AnhDaiDien, PassAuth, HoTenND, Email, SDT, Diachi, ThanhPho, PhanQuyen, ngaytao, ngaycapnhat) values('${userName}','${pass}', 'iconPeople1.jpg', '${passauth}', N'${HoTenND}', '${Email}', '${SDT}', N'${Diachi}', N'${ThanhPho}', 'User', getdate(), getdate())`, (recordset) => {
        cb(recordset.rowsAffected[0]);
    }); 
}

function checklogin(userName,cb){
    sql.executeSQL(`select * from NguoiDung where Name = '${userName}'`, (recordset) => {
        cb(recordset.recordsets[0]);
    }); 
}

module.exports = {
    signupIndex: signupIndex,
    checklogin: checklogin
}