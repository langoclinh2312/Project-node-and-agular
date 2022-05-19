var AccountResource = require('../Models/ResourceModels/AccountResource');
var Account = require('../Models/Account');
var AccountCollection = require('../Models/ResourceModels/Collections/AccountCollection')
var Helper = require('../Helper/Helper.js');

var accountCollection = new AccountCollection();
var accountResource = new AccountResource();
var helper = new Helper();
module.exports = {
    index:  function(req, res) {
        var url_string = req.headers.host + req.originalUrl; //window.location.href

        var url = new URL(url_string);

        var page = url.searchParams.get("page");
        var search = url.searchParams.get("search");

        if (search == null) {
            search = "";
        }else {
            search = decodeURI(search);
        }
        
        if (page == null) {
            page = 1;
        }

        accountResource.Count().execute(function(err, total_page) {
            if (err) {
                console.log("ERROR : ", err);
            } else {

                var pagination = "";

                accountCollection.Like({"account.name":search}).Page(page, 5).execute(function(err, data) {
                    if (err) {
                        // error handling code goes here
                        console.log("ERROR : ", err);
                    } else {
                        // code to execute on data retrieval
                        // console.log(data);
                        if (search != null && search != "") {
                           pagination = helper.Pagination(data.length,url);
                       }else {
                           pagination = helper.Pagination(total_page[0].countResult,url);
                       }
                       
                       res.render('admin/account/index', {
                        account: data,
                        pagination : pagination,
                        search : search
                    });
                   }
               });
            }
        });
    },
    search: function(req, res) {

        var url_string = req.headers.referer; //window.location.href

        var url = new URL(url_string);
        
        var search_params = url.searchParams;
        var search_value = encodeURI(req.body.search);

        search_params.set('search', search_value);

        var new_url = url.toString();
        new_url = helper.displayUrl(new_url);
        res.redirect(new_url);

    },get_create: function(req, res) {
        res.render('admin/account/create');
    }, post_create: function(req, res) {
        
        var account = new Account();

        account.SetData(req.body);
        accountResource.Save(account).execute(function(err,data){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
            } else {        
                // code to execute on data retrieval
                res.redirect('/admin/account/');
            }
        });
    },
    get_update: function(req, res) {
        
        accountResource.Get(req.params.id).execute(function(err,data){
         if (data.length === 0) {
             res.redirect('/admin/account/');
             return;
         }

         if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);      

        } else {   
        
        var account = new Account(data);
        data = null;
            // code to execute on data retrieval
            res.render('admin/account/update',{
                account : account
            });
        }
    });

    }, post_update: function(req, res) {
        var account = new Account();
        
         account.id = req.params.id;
        account.SetData(req.body);

        accountResource.Save(account).execute(function(err,data){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {        
            // code to execute on data retrieval
            res.redirect('/admin/account/');
        }
    });
    },
    get_delete: function(req, res) {
        var account = new Account();
        account.id = req.params.id;
        accountResource.Delete(req.params.id).execute(function(err,data){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {        
            // code to execute on data retrieval
            res.redirect('/admin/account/');
        }
    });
    },
    post_api: function(req, res) {

        var account = new Account();
        account.SetData(req.body);


        accountResource.Save(account).execute(function(err,data){        
            // code to execute on data retrieval
        if (err) {
            res.statusCode = 500;
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
        } else {
            res.send({ data: req.body, statusCode: 200, message: 'Đăng ký tài khoản thành công' });
        }
    });
    },
    get_api_update: function(req, res) {
        
        accountResource.Get(req.params.id).execute(function(err,data){
             if (err) {
                // error handling code goes here
                console.log("ERROR : ",err);      

            } else {   
                 // account.SetData(data);
                
                var account = new Account(data);
                data = null;

                if (err) {
                    res.statusCode = 500;
                    res.send({ data: err, statusCode: 500, message: err.sqlMessage });
                } else {
                    res.send({ data: account, statusCode: 200, message: 'oki' });
                }
            }
        });

    },
    put_api: function(req, res) {

        var account = new Account();
        account.SetData(req.body);

        accountResource.Save(account).execute(function(err,data){        
            // code to execute on data retrieval
        if (err) {
            res.statusCode = 500;
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
        } else {
            res.send({ data: req.body, statusCode: 200, message: 'Cập nhật tài khoản thành công' });
        }
    });
    },
    check_login: function(req,res){
        var role = "customer";
        accountCollection.Where({"account.email":req.body.email}).And({"account.password":req.body.password}).AndTow({"account.role": role}).execute(function(err,data){       
            // code to execute on data retrieval
            if (err) {
                res.statusCode = 500;
                res.send({ data: err, statusCode: 500, message: err.sqlMessage });
            } else {
                if(data.length){
                    res.send({ data: data[0], statusCode: 200, message: 'Đăng nhập thành công' });
                }else{
                    res.send({ data: null, statusCode: 200, message: 'Tài khoản không hợp lệ' });
                }
            }
        });
    }
};