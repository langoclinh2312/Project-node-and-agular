var CategoryResource = require('../Models/ResourceModels/CategoryResource');
var Category = require('../Models/Category');
var CategoryCollection = require('../Models/ResourceModels/Collections/CategoryCollection')
var Helper = require('../Helper/Helper.js');
const Joi = require('joi');
var categoryCollection = new CategoryCollection();
var categoryResource = new CategoryResource();
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

        categoryResource.Count().execute(function(err, total_page) {
            if (err) {
                console.log("ERROR : ", err);
            } else {

                var pagination = "";

                categoryCollection.Like({"category.name":search}).Page(page, 5).execute(function(err, data) {
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

                       res.render('admin/category/index', {
                        category: data,
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
        res.render('admin/category/create');
    }, post_create: function(req, res) {

        var category = new Category();
        category.SetData(req.body);
        categoryResource.Save(category).execute(function(err,data){
            if (err) {
                // error handling code goes here
                console.log("ERROR : ",err);            
            } else {        
                // code to execute on data retrieval
                res.redirect('/admin/category/');
            }
        });
    },get_update: function(req, res) {

        categoryResource.Get(req.params.id).execute(function(err,data){
         if (data.length === 0) {
             res.redirect('/admin/category/');
             return;
         }

         if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);      

        } else {   
         // category.SetData(data);

         var category = new Category(data);
         data = null;

            // code to execute on data retrieval
            res.render('admin/category/create',{
                category : category
            });
        }
    });
    }, post_update: function(req, res) {
        var category = new Category();
        category.SetData(req.body);
        category.id = req.params.id;

        categoryResource.Save(category).execute(function(err,data){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {        
            // code to execute on data retrieval
            res.redirect('/admin/category/');
        }
    });
    },
    get_delete: function(req, res) {
        var category = new Category();
        category.id = req.params.id;
        categoryResource.Delete(req.params.id).execute(function(err,data){
            if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {        
            // code to execute on data retrieval
            res.redirect('/admin/category/');
        }
    });
    },get_api: function(req, res) {
        categoryCollection.execute(function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.send({ data: err, statusCode: 500, message: err.sqlMessage });
            } else if (data.length == 0) {
                res.statusCode = 404;
                res.send({ data: null, statusCode: 404, message: 'not found' });
            } else {
                res.send({ data: data, statusCode: 200, message: 'ok' });
            }
        });
    }
}