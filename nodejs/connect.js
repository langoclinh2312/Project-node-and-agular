const mysql = require('mysql');
const data = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app'
});
data.connect(function(err) {
    if (err) throw new Error('Kêt nối không thành công');
});
module.exports = data;