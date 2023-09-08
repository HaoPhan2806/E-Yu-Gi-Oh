var express = require('express');
const path = require('path');
const sql = require('./sql');
const search = require('./search');
const getProduct = require('./getProductMaDM');
const productCate = require('./productCate');
const getDetailData = require('./getDetailData');
const getprodif = require('./getprodif');
const blogdata = require('./blog-data');
const blogcate = require('./blogcate');
const contact = require('./contact-data');
const loginIndex = require('./loginIndex');
const signupIndex = require('./signupIndex');
const detailblog = require('./detaildata_blog');
const shoppingcart = require('./shoppingcart');
const getProductMaPT = require('./getProductMaPT');
const CommentBlog = require('./CommentBlog');
const contactus = require('./contactus');

const multer = require('multer');
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: function (req, file, cb) {
        cb(null, '../HTML/public/img')
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Index:
app.get('/', function (req, res) {
    sql.executeSQL(`select * from SanPham where MaPT = 1`, (recordset) => {
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
});
app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

//detail product:
app.get('/getDetailData/:id', function (req, res) {
    getDetailData.getDetailData(req, res);
});
app.get('/detail/:id', function (req, res) {
    res.sendFile(__dirname + "/detail.html");
});

//search:
app.post('/search', function (req, res) {
    search.search(req.body.search, res);
});

//Show Product by MaDM:
app.post('/getProductMaDM', function (req, res) {
    getProduct.getProductMaDM(req.body.MaDM, res);
});

//Show Product by MaPT:
app.post('/getProductMaPT', function (req, res) {
    getProductMaPT.getProductMaPT(req.body.MaPT, res);
});

//Show Product different:
app.get('/getprodif', function (req, res) {
    getprodif.getprodif(req, res);
});

//Product:
app.get('/productCate', function (req, res) {
    productCate.productCate(req, res);
});
app.get('/product', function (req, res) {
    res.sendFile(__dirname + "/product.html");
});

//Blog:
app.get('/blog-data', function (req, res) {
    blogdata.blogdata(req, res);
});
app.get('/blog', function (req, res) {
    res.sendFile(__dirname + "/blog.html");
});

//Show Blog by DMTT:
app.post('/blogcate', function (req, res) {
    blogcate.blogcate(req.body.DMTT, res);
});

//Detail Blog:
app.get('/detail_blog/:MATT', function (req, res) {
    res.sendFile(__dirname + "/detail_blog.html");
});
app.get('/detaildata_blog/:MATT', function (req, res) {
    detailblog.detailblog(req.params.MATT, res);
});

//Contact:
app.get('/contact-data', function (req, res) {
    contact.contactdata(req, res);
});
app.get('/contact', function (req, res) {
    res.sendFile(__dirname + "/contact.html");
});

//Contact Us:
app.post('/ContactUs', function (req, res) {
    contactus.contactus(req.body.Name, req.body.Phone, req.body.Email, req.body.NoidungLH, (user) => {
        res.send(user);
    });
});
app.get('/contactnow', function (req, res) {
    res.sendFile(__dirname + "/contactnow.html");
});

//Login:
app.post('/getlogin', function (req, res) {
    loginIndex.loginIndex(req.body.userName, req.body.pass, (user) => {
        res.send(user);
    });
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

//Check Login:
app.post('/checklogin', function (req, res) {
    signupIndex.checklogin(req.body.userName, (user) => {
        res.send(user);
    });
});

//Sign Up:
app.post('/signupIndex', function (req, res) {
    signupIndex.signupIndex(req.body.userName, req.body.pass, req.body.passauth, req.body.HoTenND, req.body.Email, req.body.SDT, req.body.Diachi, req.body.ThanhPho, (rowsAffected) => {
        res.send(rowsAffected.toString());
    });
});
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

//Shopping Cart:
app.post('/getShoppingcart', function (req, res) {
    shoppingcart.getShoppingcart(req, res);
});
app.get('/shoppingcart', function (req, res) {
    res.sendFile(__dirname + "/shoppingcart.html");
});

//Buy Product:
app.post('/buyProducts', async function (req, res) {
    await shoppingcart.buyProduct(req.body.MaKH, req.body.arrSP);
    res.send("ok");
});
app.post('/getDetailBuyNow', function (req, res) {
    shoppingcart.getDetailBuyNow(req, res);
});
app.get('/detailBuyNow', function (req, res) {
    res.sendFile(__dirname + "/detailBuyNow.html");
});

//Delete Product:
app.post('/deleteSC', function (req, res) {
    DeleteShoppingCart.DeleteShoppingCart(req, (user) => {
        res.send(user);
    });
});

//Get comment:
app.post('/getComment', function (req, res) {
    CommentBlog.CommentBlog(req.body.HoTenND, req.body.NoiDungCM, req.body.MaTT, (user) => {
        res.send(user);
    });
});

//Show comment:
app.post('/ShowComBlog', function (req, res) {
    CommentBlog.ShowComBlog(req.body.MaTT, res);
});

//Profile:
app.get('/profile', function (req, res) {
    res.sendFile(__dirname + "/profile.html");
});
app.get('/getProfile/:ID', function (req, res) {
    sql.executeSQL(`select * from NguoiDung where ID = ${req.params.ID}`, (recordset) => {
        var row = recordset.recordsets[0][0];
        res.send(row);
    });
});
app.get('/getMyorder/:ID', function (req, res) {
    sql.executeSQL(`select HOADON.MaHD, HOADON.NgayBan, SanPham.ProductImage, SanPham.ProductName, ChiTietHoaDon.SoLuong, ChiTietHoaDon.GiaBan
    from HOADON join ChiTietHoaDon on HOADON.MaHD = ChiTietHoaDon.MaHD
    join SanPham on SanPham.id = ChiTietHoaDon.MaSP
    join NguoiDung on NguoiDung.ID = HOADON.MaKH
    where NguoiDung.ID = ${req.params.ID}`, (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
            <table>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sale date</th>
                </tr>
                <tr>
                    <td><img class="imageOrder" src='/img/${row['ProductImage']}'/></td>
                    <td>${row['ProductName']}</td>
                    <td>${row['SoLuong']}</td>
                    <td>${row['GiaBan']}</td>
                    <td>${row['NgayBan']}</td>
                </tr>
            </table>
            `;
        });
        res.send(result);
    });
});

//Edit Profile:
app.get('/pro-file/:ID', function (req, res) {
    res.sendFile(__dirname + "/EditPersonal.html");
});
app.get('/EditPersonal/:ID', function (req, res) {
    sql.executeSQL(`select * from NguoiDung where ID = ${req.params.ID}`, (recordset) => {
        var row = recordset.recordsets[0][0];
        res.send(row);
    });
});
app.post('/EditPersonal/:ID', imageUpload.single('AnhDaiDien'), function (req, res) {
    var AnhDaiDien = req.body.AnhDaiDien = req.file.path.split('\\').slice(4).join('/')
    var HoTenND = req.body.HoTenND;
    var Email = req.body.Email;
    var SDT = req.body.SDT;
    var Diachi = req.body.Diachi;
    var ThanhPho = req.body.ThanhPho;
    sql.executeSQL(`update NguoiDung 
    set AnhDaiDien = '${AnhDaiDien}', HoTenND = N'${HoTenND}', Email = N'${Email}', SDT = N'${SDT}',
    Diachi = N'${Diachi}', ThanhPho = N'${ThanhPho}'
    where ID = ${req.params.ID}`,
        (recordset) => {
            var row = recordset.recordsets[0];
            res.redirect('/profile');
        });
});

//Localhost connection server:
var server = app.listen(6969, function () {
    console.log('Server is running..');
});


app.get('/admin', function (req, res) {
    res.sendFile(__dirname+"/admin_home.html");
});

//dssp

app.get('/admin/danhsachsanpham', function (req, res) {
    res.sendFile(__dirname+"/danhsachsanpham.html");
});

app.get('/admin/tablesanpham', function (req, res) {
    sql.executeSQL("select * from SanPham", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                        <tr>
                        <th scope="row">${row['id']}</th>
                        <td><img src="/img/${row['ProductImage']}" alt="" style= "width: 80px; "></td>
                        <td>${row['ProductName']}</td>
                        <td>${row['Price']}</td>
                        <td>${row['ngaytao']}</td>
                        <td>${row['ngaycapnhat']}</td>
                        <td>${row['ProductDescription']}</td>
                        <td><a href="/admin/edit-product/${row['id']}" class="btn btn-outline-success">Sửa</a></td>
                        <td><button onclick="XoaSanPham(${row['id']})" class="btn btn-outline-danger">Xóa</button></td>
                        </tr>
                `;
        });
        res.send(result); 
    });   
});


app.get('/admin/edit-product/:id', function (req, res) {
    res.sendFile(__dirname+"/button-sua.html");
});


app.get('/admin/editProduct/:id', function (req, res) {
    sql.executeSQL(`select * from SanPham where id = ${req.params.id}`, (recordset) => {
         var row = recordset.recordsets[0][0];
            res.send(row);
     });
});

app.post('/admin/editProduct/:id',imageUpload.single('AnhDaiDien'), function (req, res) {
    var AnhDaiDien = req.body.AnhDaiDien = req.file.path.split('\\').slice(4).join('/') 
    var ProductName = req.body.ProductName;
    var Price = req.body.Price;
    var ProductDescription = req.body.ProductDescription;
    sql.executeSQL(`update SanPham 
    set ProductImage='${AnhDaiDien}' , ProductName = N'${ProductName}',
    Price = ${Price},
    ProductDescription= N'${ProductDescription}',
    ngaycapnhat= getdate() where id = ${req.params.id}`,
    (recordset) => {
         res.redirect('/admin/danhsachsanpham')
            
     });
});

app.get('/admin/create-product', function (req, res) {
    res.sendFile(__dirname+"/themsanpham.html");
})

app.post('/admin/create-product', imageUpload.single('AnhDaiDien'), function (req, res) {
    //req.file.path.split('\\') -> ['HTML2','','HTML2','admin','editProduct','1637850748547.png'].slice(2) -> 
    //['uploads','1637850748547.png'].join('/') -> uploads/1637850748547.png
    var AnhDaiDien = req.body.AnhDaiDien = req.file.path.split('\\').slice(4).join('/') 
    sql.executeSQL(`insert into SanPham(ProductImage,ProductName,Price,ProductDescription,ngaytao,ngaycapnhat) values ('${AnhDaiDien}', N'${req.body.ProductName}','${req.body.Price}',N'${req.body.MoTa}',getdate(),getdate())`, (recordset) => {
        var row = recordset.recordsets[0];
        res.redirect('/admin/danhsachsanpham')
        res.send(row);
     });
})

app.post('/delete-product', function (req, res) {
    var productid = req.body.productid;
    sql.executeSQL(`delete from SanPham where id = ${productid}`, (recordset) => {
        var row = recordset.recordsets[0];
        res.redirect('/admin/danhsachsanpham')
        res.send(row);
     });
})

//hoadon

app.get('/admin/tableHOADON', function (req, res) {
    sql.executeSQL(`select * from NguoiDung join HOADON on HOADON.MaKH = NguoiDung.ID`, (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                        <tr>
                        <th scope="row">${row['ID']}</th>
                        <td>${row['HoTenND']}</td>
                        <td>${row['Diachi']}</td>
                        <td>${row['SDT']}</td>
                        <td>${row['NgayBan']}</td>
                        <td><a href="/admin/hoadonchitiet/${row['MaHD']}" class="btn btn-outline-success">Xem Chi Tiết</a></td>
                        </tr>
                `;
        });
        res.send(result);
    });   
});

app.get('/admin/danhsachhoadon', function (req, res) {
    res.sendFile(__dirname+"/hoadon.html");
});

app.get('/admin/detail_hoadon/:id', function (req, res) {
    res.sendFile(__dirname+"/button-detailhoadon.html");
});



app.post('/delete-hoadon', function (req, res) {
    var MaHD = req.body.MaHD;
    // console.log("MaHoaDon " + productid)
    sql.executeSQL(`exec DeleteHoaDon ${MaHD}`, (recordset) => {
        var row = recordset.recordsets[0];
        res.redirect('/admin/danhsachhoadon')
        res.send(row);
     });
})

// hoa don

app.get('/admin/hoadonchitiet/:id', function (req, res) {
    res.sendFile(__dirname+"/chitiethoadon.html");
});

app.post('/admin/hoadonchitiet/:id', function (req, res) {
    sql.executeSQL(`select NguoiDung.HoTenND, NguoiDung.SDT, NguoiDung.Diachi, NguoiDung.ThanhPho,
     SanPham.ProductName,ChiTietHoaDon.SoLuong, ChiTietHoaDon.GiaBan,
      HOADON.NgayBan from HOADON 
      join ChiTietHoaDon on HOADON.MaHD = ChiTietHoaDon.MaHD 
      join NguoiDung on HOADON.MaKH = NguoiDung.ID 
      join SanPham on ChiTietHoaDon.MaSP = SanPham.id where HOADON.MaHD = ${req.params.id} `, (recordset) => {
        var row = recordset.recordsets[0][0];
        // var tongsoluong = row.SoLuong
        // console.log(tongsoluong) 
        res.send(row);
    }); 
});

//account

app.get('/admin/account', function (req, res) {
    res.sendFile(__dirname+"/account.html");
});


app.get('/admin/listaccount', function (req, res) {
    sql.executeSQL("select * from NguoiDung", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                        <tr>
                        <th scope="row">${row['ID']}</th>
                        <td>${row['Name']}</td>
                        <td>${row['Email']}</td>
                        <td>${row['SDT']}</td>
                        <td>${row['PhanQuyen']}</td>
                        <td>${row['ngaytao']}</td>
                        <td>${row['ngaycapnhat']}</td>
                        <td><a href="/admin/edit-account/${row['ID']}" class="btn btn-outline-success">Sửa</a></td>
                        <td><button onclick="XoaThongTin(${row['ID']})" class="btn btn-outline-danger">Xóa</button></td>
                        </tr>
                `;
        });
        res.send(result);
    });   
});

app.get('/admin/edit-account/:id', function (req, res) {
    res.sendFile(__dirname+"/button-sua-account.html");
});

app.get('/admin/editaccount/:id', function (req, res) {
    sql.executeSQL(`select * from NguoiDung where id = ${req.params.id}`, (recordset) => {
         var row = recordset.recordsets[0][0];
            res.send(row);
     });
});

app.post('/admin/editaccount/:id', function (req, res) {
    var Name = req.body.Name;
    var Email = req.body.Email;
    var SDT = req.body.SDT;
    var PhanQuyen = req.body.PhanQuyen;
    sql.executeSQL(`update NguoiDung 
    set Name = N'${Name}',
    Email = N'${Email}',
    SDT = ${SDT},
	PhanQuyen = N'${PhanQuyen}',
    ngaytao = getdate(),
    ngaycapnhat= getdate() where ID = ${req.params.id}`,
    (recordset) => {
        // var row = recordset.recordsets[0];
         res.redirect('/admin/account')

     });
});

app.post('/delete-account', function (req, res) {
    var ID = req.body.ID;
    sql.executeSQL(`delete from NguoiDung where id = ${ID}`, (recordset) => {
        var row = recordset.recordsets[0];
        res.redirect('/admin/account')
        res.send(row);
     });
})


// contact us

app.get('/admin/contactus', function (req, res) {
    res.sendFile(__dirname+"/contactus.html");
});


app.get('/admin/REQESTS', function (req, res) {
    sql.executeSQL("select * from ContactUs", (recordset) => {
        var result = "";
        recordset.recordsets[0].forEach(row => {
            result += `
                        <tr>
                        <th scope="row">${row['MaLH']}</th>
                        <td>${row['Name']}</td>
                        <td>${row['Phone']}</td>
                        <td>${row['Email']}</td>
                        <td>${row['NoidungLH']}</td>
                        <td><button onclick="XoaReqests(${row['MaLH']})" class="btn btn-outline-danger">Phản Hồi</button></td>
                        </tr>
                `;
        });
        res.send(result);
    });   
});


app.post('/delete-Reqests', function (req, res) {
    var MaLH = req.body.MaLH;
    sql.executeSQL(`delete from ContactUs where MaLH = ${MaLH}`, (recordset) => {
        var row = recordset.recordsets[0];
        res.redirect('/admin/contactus')
        res.send(row);
     });
})