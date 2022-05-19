var ToursResource = require('../Models/ResourceModels/ToursResource');
var Tours = require('../Models/Tours');
var ToursCollection = require('../Models/ResourceModels/Collections/ToursCollection');
var CategoryCollection = require('../Models/ResourceModels/Collections/CategoryCollection');
var Helper = require('../Helper/Helper');
var toursCollection = new ToursCollection();
var toursResource = new ToursResource();
var categoryCollection = new CategoryCollection();
var helper = new Helper();

module.exports = {
    index: function(req, res) {
        var url_string = req.headers.host + req.originalUrl; //window.location.href

        var url = new URL(url_string);

        var page = url.searchParams.get("page");
        var search = url.searchParams.get("search");


        if (search == null) {
            search = "";
        } else {
            search = decodeURI(search);
        }

        if (page == null) {
            page = 1;
        }

        toursResource.Count().execute(function(err, total_page) {
            if (err) {
                console.log("ERROR : ", err);
            } else {

                var pagination = "";

            toursCollection.Like({ "tours.name": search }).Page(page, 5).execute(function(err, data) {
                    if (err) {
                        // error handling code goes here
                        console.log("ERROR : ", err);
                    } else {
                        // code to execute on data retrieval
                        if (search != null && search != "") {
                            pagination = helper.Pagination(data.length, url);
                        } else {
                            pagination = helper.Pagination(total_page[0].countResult, url);
                        }
                        res.render('admin/tours/index', {
                            tours: data,
                            pagination: pagination,
                            search: search
                        });
                    }
                });
            }
        })
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

    },
    get_create: function(req, res) {
        categoryCollection.execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                res.render('admin/tours/create', {
                    category: data
                });
            }
        });
    },
    post_create: function(req, res) {

        var tours = new Tours();
        helper.uploadFile(req.body.image);
        var filename = req.file.filename;
        req.body.image = filename;

        tours.SetData(req.body);

        toursResource.Save(tours).execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                res.redirect('/admin/tours/');
            }
        });
    },
    get_update: function(req, res) {

        toursResource.Get(req.params.id).execute(function(err, data) {
            if (data && data.length === 0) {
                res.redirect('/admin/tours/');
                return;
            }

            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // tours.SetData(data);

                var tours = new Tours(data);
                data = null;

                categoryCollection.execute(function(err, data) {
                    if (err) {
                        // error handling code goes here
                        console.log("ERROR : ", err);
                    } else {
                        // code to execute on data retrieval
                        res.render('admin/tours/create', {
                            category: data,
                            tours: tours
                        });
                    }
                });
            }
        });
    },
    post_update: function(req, res) {
        var tours = new Tours();

        helper.uploadFile(req.body.image);
        var filename = req.file.filename;
        req.body.image = filename;

        tours.SetData(req.body);
        tours.id = req.params.id;

        toursResource.Save(tours).execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                res.redirect('/admin/tours/');
            }
        });
    },
    get_delete: function(req, res) {
        var tours = new Tours();
        tours.id = req.params.id;
        toursResource.Delete(req.params.id).execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                res.redirect('/admin/tours/');
            }
        });
    },
    get_api: function(req, res) {

        var url_string = req.headers.host + req.originalUrl; //window.location.href

        var url = new URL(url_string);

        var search = url.searchParams.get("search");
        
        if (search == null) {
            search = "";
        } else {
            search = decodeURI(search);
        }
        toursCollection.Like({ "tours.name": search }).execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                if (search != null && search != "") {
                    pagination = helper.Pagination(data.length, url);
                }

                if (err) {
                    res.statusCode = 500;
                    res.send({ data: err, statusCode: 500, message: err.sqlMessage });
                } else if (data.length == 0) {
                    res.statusCode = 404;
                    res.send({ data: null, statusCode: 404, message: 'not found' });
                } else {
                    res.send({ data: data, search: search, statusCode: 200, message: 'ok' });
                }
            }
        });
    },
    delete_api: function(req, res) {
        var tours = new Tours();
        tours.id = req.params.id;
        toursResource.Delete(req.params.id).execute(function(err, data) {
            if (err) {
                // error handling code goes here
                console.log("ERROR : ", err);
            } else {
                // code to execute on data retrieval
                if (err) {
                    res.statusCode = 500;
                    res.send({ data: err, statusCode: 500, message: err.sqlMessage });
                } else {
                    res.send({ data: null, statusCode: 200, message: 'Xóa danh mục thành công' });
                }
            }
        });
    },
    orderby: function(req, res) {
        var url_string = req.headers.host + req.originalUrl; //window.location.href

        var url = new URL(url_string);

        var search = url.searchParams.get("search");
        var orderby = url.searchParams.get("orderby");
        var collocation = url.searchParams.get("collocation");

        if (search == null) {
            search = "";
        } else {
            search = decodeURI(search);
        }

        if (orderby == null) {
            orderby = "id";
        } else {
            orderby = decodeURI(orderby);
        }

        if (collocation == null) {
            collocation = "";
        } else {
            collocation = decodeURI(collocation);
        }
        
        toursCollection.Like({ "tours.name": search }).OrderBy(orderby,collocation).execute(function(err, data) {

            // code to execute on data retrieval
            if (search != null && search != "") {
                pagination = helper.Pagination(data.length, url);
            }

            if (err) {
                res.statusCode = 500;
                res.send({ data: err, statusCode: 500, message: err.sqlMessage });
            } else if (data.length == 0) {
                res.statusCode = 404;
                res.send({ data: null, statusCode: 404, message: 'not found' });
            } else {
                res.send({ data: data, search: search, statusCode: 200, message: 'ok' });
            }
        });
    },
    explore: function(req, res) {
        var url_string = req.headers.host + req.originalUrl; //window.location.href

        var url = new URL(url_string);

        var search = url.searchParams.get("search");
        var orderby = url.searchParams.get("orderby");
        var collocation = url.searchParams.get("collocation");

        if (search == null) {
            search = "";
        } else {
            search = decodeURI(search);
        }

        if (orderby == null) {
            orderby = "id";
        } else {
            orderby = decodeURI(orderby);
        }

        if (collocation == null) {
            collocation = "";
        } else {
            collocation = decodeURI(collocation);
        }

        toursCollection.Where({ "tours.category_id": req.params.id }).OrderBy(orderby,collocation).execute(function(err, data) {

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
    },
    get_detail_api: function(req, res) {

        toursCollection.Where({ "tours.id": req.params.id }).execute(function(err, data) {
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