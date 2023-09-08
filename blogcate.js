const sql = require('./sql');

function blogcate(DMTT,res){
    sql.executeSQL(`select * from TinTuc where DMTT = '${DMTT}' order by indexTT`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Không Tìm Thấy Tin Tức.");
        }
        else{
            recordset.recordsets[0].forEach(row => {
                result += `
                <div id="p1">
                    <a href="/detail_blog/${row['MATT']}" class="a-img"><img id="pi" src='/img/${row['AnhTT']}'/></a>
                    <div id="ptb">
                        <div id="pn"><b id=ptd>${row['TenTT']}</b></div><br>
                        <div>Ngày đăng tin: ${row['NgayDangTT']}</div>
                        <div id="pp"><span> ${row['Noidung']}</span></div>
                        <a id="a" href="/detail_blog/${row['MATT']}">Xem Tiếp &gt</a>
                    </div>
                </div>
                `;
            });
            res.send(result);
        }
    });   
}

module.exports = {
    blogcate: blogcate
}