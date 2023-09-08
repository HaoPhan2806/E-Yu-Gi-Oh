const sql = require('./sql');

function productCate(req, res) {
    sql.executeSQL("select * from SanPham where MaPT = 2 order by IndexSP", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
            <div class="p1">
                <a href="/detail/${row['id']}" class="a-img"><img class="pi" src='/img/${row['ProductImage']}'/></a>
                <div class="pn"><b>${row['ProductName']}</b></div>
                <div class="icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                <div class="a" onclick="addtocart(${row['id']})">ADD TO CART</div>
                <div class="pp"><span> ${row['Price']}$</span></div>
            </div>
            `;
        });
        res.send(result);
    });
}

module.exports = {
    productCate: productCate
}