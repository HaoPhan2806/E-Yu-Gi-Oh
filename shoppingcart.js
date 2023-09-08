const sql = require('./sql');

function getShoppingcart(req, res) {
    var arrProductId = req.body.arrProductId
    sql.executeSQL(`select * from SanPham where id IN ${arrProductId}`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Products in the cart are currently not available!");
        }
        else {
            recordset.recordsets[0].forEach(row => {
                result += `
                    <table id="customers" class="product" productid= '${row['id']}' price='${row['Price']}'>
                        <tr>
                        <th>STT</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th></th>
                        </tr>
                        <tr>
                        <td>${row['id']}</td>
                        <td>
                        <div class="grid-item-1">
                            <img class="imgdetail" src='/img/${row['ProductImage']}'/>
                        </div>
                        </td>
                        <td class="grid-item-2"><h1 class="namedetail"><b>${row['ProductName']}</b></h1></td>
                        <td><div class="pricedetail"><span>${row['Price']}$</span></div></td>
                        <td style="text-align: center"><input class="soluong" onblur="TongTien()" value="1"/></td>
                        <td><div class="icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div></td>
                        <td><button class="a" onclick="deleteProCart(${row['id']})">DELETE</button></td>
                        </tr>
                    </table>
                    `;
            });
            res.send(result);
        }
    });
}

async function buyProduct(MaKH, arrSP) {
    await sql.executeSQLSync(`insert into HOADON (MaKH, NgayBan) values ('${MaKH}', getdate())`);
    var data = await sql.executeSQLSync(`select @@IDENTITY as MAHD`);
    arrSP.forEach(async objSP => {
        console.log("MaHD", data.recordsets[0][0].MAHD);
        await sql.executeSQLSync(`insert into ChiTietHoaDon(MaHD, MaSP, SoLuong, GiaBan) values ('${data.recordsets[0][0]["MAHD"]}', '${objSP.MaSP}', '${parseInt(objSP.SoLuong)}', '${parseInt(objSP.GiaBan)}' )`);
    });
};


function getDetailBuyNow(req, res) {
    var arrProductId = req.body.arrProductId
    sql.executeSQL(`select * from SanPham where id IN ${arrProductId}`, (recordset) => {
        var result = "";
        if (recordset.recordsets[0] === null || recordset.recordsets[0].length === 0) {
            res.send("Products in the cart are currently not available!");
        }
        else {
            recordset.recordsets[0].forEach(row => {
                result += `
                    <table id="customers" class="product" productid= '${row['id']}' price='${row['Price']}'>
                        <tr>
                        <th>STT</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        </tr>
                        <tr>
                        <td>${row['id']}</td>
                        <td>
                        <div class="grid-item-1">
                            <img class="imgdetail" src='/img/${row['ProductImage']}'/>
                        </div>
                        </td>
                        <td class="grid-item-2"><h1 class="namedetail"><b>${row['ProductName']}</b></h1></td>
                        <td><div class="pricedetail"><span>${row['Price']}$</span></div></td>
                        <td style="text-align: center"><input class="soluong" onblur="TongTien()" value="1"/></td>
                        <td><div class="icon"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div></td>
                        </tr>
                    </table>
                    `;
            });
            res.send(result);
        }
    });
}

module.exports = {
    getShoppingcart: getShoppingcart,
    buyProduct: buyProduct,
    getDetailBuyNow: getDetailBuyNow
}