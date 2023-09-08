const sql = require('./sql');

function CommentBlog(HoTenND,NoiDungCM,MaTT,cb){
    sql.executeSQL(`insert into Comment(HoTenND, NoiDungCM, MaTT) values (N'${HoTenND}' , N'${NoiDungCM}', ${MaTT})`, (recordset) => {
        cb(recordset.recordsets[0]);
    }); 
}



function ShowComBlog(MaTT, res){
    sql.executeSQL(`select NguoiDung.AnhDaiDien, Comment.HoTenND, Comment.NoiDungCM
    from Comment
    join NguoiDung on Comment.HoTenND = NguoiDung.HoTenND
    join TinTuc on Comment.MaTT = TinTuc.MaTT
    where Comment.MaTT = ${MaTT}`, (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                <div class="p1">
                    <img class="imgdetail" src='/img/${row['AnhDaiDien']}'/>
                    <div class="pn"><b>${row['HoTenND']}</b></div>
                    <div class="pp"><span> ${row['NoiDungCM']}</span></div>
                </div>
            `;
        });
        res.send(result);
    }); 
}

module.exports = {
    CommentBlog: CommentBlog,
    ShowComBlog: ShowComBlog
}