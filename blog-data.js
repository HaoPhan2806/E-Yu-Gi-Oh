const sql = require('./sql');
var moment = require('moment');

function blogdata(req,res){
    sql.executeSQL(`select * from TinTuc order by indexTT`, (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                <div id="p1">
                    <a href="/detail_blog/${row['MaTT']}" class="a-img"><img id="pi" src='/img/${row['AnhTT']}'/></a>
                    <div id="ptb">
                        <div id="pn"><b id=ptd>${row['TenTT']}</b></div><br>
                        <div>Ngày đăng tin: ${row['NgayDangTT']}</div>
                        <div id="pp"><span> ${row['Noidung']}</span></div>
                        <a id="a" href="/detail_blog/${row['MaTT']}">Xem Tiếp &gt</a>
                    </div>
                </div>
            `;
        });
        res.send(result);
    });
}

module.exports = {
    blogdata: blogdata
}