const multer = require('multer');
var path = require('path');

class Helper {

    Pagination(total_page, url) {

        var numberOfPage = Math.ceil((total_page) / 5);

        var c = url.searchParams.get("page");
        c = parseInt(c);
        var search_params = url.searchParams;

        search_params.set('page', c > 1 ? c - 1 : 1);
        var previousUrl = url.toString();
        previousUrl = this.displayUrl(previousUrl);
        var predisabled = c > 1 ? "" : "disabled";

        var paginationHtml = '<nav aria-label="Page navigation">\
        <ul class="pagination justify-content-end">\
        <li class="page-item ' + predisabled + '"  >\
        <a class="page-link" href="' + previousUrl + '" tabindex="-1">Previous</a>\
        </li>';

        for (var i = 1; i <= numberOfPage; i++) {
            search_params.set('page', i);
            var new_url = url.toString();
            new_url = this.displayUrl(new_url);
            paginationHtml += '<li class="page-item"><a class="page-link" href="' + new_url + '" >' + i + '</a></li>';
        }

        search_params.set('page', (c < numberOfPage) ? c + 1 : numberOfPage);
        var nextUrl = url.toString();
        nextUrl = this.displayUrl(new_url);
        var nextdisabled = (c >= numberOfPage) ? "disabled" : "";

        paginationHtml += '	<li class="page-item ' + nextdisabled + '" >\
        <a class="page-link" href="' + nextUrl + '">Next</a>\
        </li>\
        </ul>\
        </nav>';

        return paginationHtml;
    }

    displayUrl(url) {

        url = url + "";
        var new_url = "/";
        var res = url.split("/");
        for (var i = 1; i < res.length; i++) {
            new_url += res[i] + "/";
        }
        return new_url.slice(0, -1);
    }

    upload() {
        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'public/uploads/');
            },
            filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });

        var upload = multer({ storage: storage });
        return upload;
    }

    uploadFile(file) {

        if (!file) {
            const err = new Error('Please upload a file')
            err.httpStatusCode = 400
            return err
        }
        res.send(file);

    }
}

module.exports = Helper;