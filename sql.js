var sql = require("mssql/msnodesqlv8");

function executeSQL(strSQl, cb) {
    // config for your database
    var config = {
        server: "DESKTOP-LOLUPRS\\NHATHAO",
        user: "sa",
        password: "123456",
        database: "Product",
        driver: "msnodesqlv8"
    }
    const conn = new sql.ConnectionPool(config).connect().then(pool => {
        return pool;
    });
    module.exports = {
        conn: conn,
        sql: sql
    }
    // connect to your database
    sql.connect(config, function (err, db) {
        //console.log(db);
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(strSQl, function (err, recordset) {
            if (err) console.log(err)
            cb(recordset);
        });
    });
}

function executeSQLSync(strSQl) {
    // config for your database
    var config = {
        server: "DESKTOP-LOLUPRS\\NHATHAO",
        user: "sa",
        password: "123456",
        database: "Product",
        driver: "msnodesqlv8"
    }
    const conn = new sql.ConnectionPool(config).connect().then(pool => {
        return pool;
    });
    module.exports = {
        conn: conn,
        sql: sql
    };
    var connectSQL = new Promise((resolve, reject) => {
        sql.connect(config, function (err, db) {
            //console.log(db);
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.query(strSQl, function (err, recordset) {
                if (err) console.log(err)
                resolve(recordset);
            });
            // query to the database and get the records   
        });
    });
    return connectSQL;
}


module.exports = {
    executeSQL: executeSQL,
    executeSQLSync: executeSQLSync
}