const mysql = require('mysql');
const data = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1',
    database: 'appNode'
});
data.connect(function(err) {
    if (err) throw new Error('Kêt nối không thành công');
});
module.exports = data;