const sql = require('./sql');

function contactdata(req, res){
    sql.executeSQL("select * from ConTact", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                <div id="p1111">
                    <div id="p1">
                        <a href="${row['MACONTACT']}" class="a-img"><img id="pi" src='/img/${row['ANHCONTACT1']}'/></a>
                        <div id="ptb">
                        <img id="pii" src='/img/${row['LOGOCONTACT1']}'/>
                        <div id="pn"><b id=ptd>${row['TENTIEUDE1']}</b></div>
                        <div id="pp"><span> ${row['NOIDUNG1']}</span></div>
                        <a id="a" href="/contactnow">  Liên hệ</a>
                        </div>
                    </div>
                    <div id="p2">
                        <div id="ptb2">
                            <img id="pii" src='/img/${row['LOGOCONTACT2']}'/>
                            <div id="pn2"><b id=ptd>${row['TENTIEUDE2']}</b></div>
                            <div id="pp2"><span> ${row['NOIDUNG2']}</span></div>
                            <a id="a" href="/contactnow">  Liên hệ </a>
                        </div>
                            <img id="pi2" src='/img/${row['ANHCONTACT2']}'/>
                    </div>
                </div>
            `;
        });
        res.send(result);
    });  
}

module.exports = {
    contactdata: contactdata
}