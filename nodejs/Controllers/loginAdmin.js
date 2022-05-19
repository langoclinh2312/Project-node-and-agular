var AccountResource = require('../Models/ResourceModels/AccountResource');
var Account = require('../Models/Account');
var AccountCollection = require('../Models/ResourceModels/Collections/AccountCollection');
var Helper = require('../Helper/Helper.js');
const sessionstorage = require('sessionstorage');

var accountCollection = new AccountCollection();
var accountResource = new AccountResource();
var helper = new Helper();
module.exports = {
    get_login: function(req, res) {
        res.render('admin/login/login');
    }, 
    post_login: function(req, res) {
        var role = "admin";
        accountCollection.Where({"account.email":req.body.email}).And({"account.password":req.body.password}).AndTow({"account.role": role}).execute(function(err,data){        
            // code to execute on data retrieval
            if (err) {
                res.send('có lỗi trong truy vấn dữ liệu, vui lòng thử lại');
            } else {
                if(data.length > 0){
                    // save in session
                    sessionstorage.setItem('adminlogin',JSON.stringify(data[0]));
                    res.redirect('/admin/category');
                }else{
                    res.send('Bạn đang dùng tài khản người dùng hoặc tài khoản không hợp lệ');
                }
            }
        });
    },
    get_logout: function(req, res) {
        sessionstorage.removeItem('adminlogin');
        res.redirect('/admin/login');
    }, 
};