const sql = require('./sql');

function getDetailData(req,res){
    sql.executeSQL(`select * from SanPham where id = ${req.params.id}`, (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
            <div class="container-grid">
            <div class="grid-item-1">
                <img class="imgdetail" src='/img/${row['ProductImage']}' />
            </div>
            <div class="grid-item-2">
                <h1 class="namedetail"><b>${row['ProductName']}</b></h1>
                <div class="icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                <div class="pricedetail">Giá: <i>${row['Price']}$</i> </div>
                <div class="container-btn">
                    <div class="addtocart" onclick="addtocart(${row['id']})">ADD TO CART</div>
                </div>
                <div class="descrip">
                    <h3 style="text-decoration: underline;">Mô tả sản phẩm:</h3>
                    <p>${row['ProductDescription']}</p>
                </div>
                <div>
                    <button class="back"><a href="/index">&lt; Quay về</a></button>
                </div>
            </div>
        </div>
            `;
        });
        res.send(result);
   });
}


module.exports = {
    getDetailData: getDetailData
}