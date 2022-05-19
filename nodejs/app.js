const express = require('express');
const ejs = require('ejs');
ejs.delimiter = '?';
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const data = require('./connect');
const router = express.Router();
const sessionstorage = require('sessionstorage');
const app = express();


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

// cross-origin
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

//library declaration
app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', ejs.__express);

app.use(function(req, res, next) {
    if(req.query.is_angular){
        // api
        const adminRouteApiAccount = require('./routes/apiAccount');
        const adminRouteAPiCategory = require('./routes/apiCategory');
        const adminRouteApiTours = require('./routes/apiTours');

        app.use('/admin/account', adminRouteApiAccount);
        app.use('/admin/category', adminRouteAPiCategory);
        app.use('/admin/tours', adminRouteApiTours);
    }else{
        // login admin
        const adminRouteloginAdmin = require('./routes/loginAdmin');

        app.use('/admin', adminRouteloginAdmin);
        // check login
        app.use(function(req, res, next) {
            let key = sessionstorage.getItem('adminlogin') ? sessionstorage.getItem('adminlogin') : false;
            if(!key){
               if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                   // send your xhr response here
                   next();
                } else {
                  if(req.query.is_angular){
                    next();
                  }else{
                    res.redirect('/admin/login');
                  }
                // send your normal response here
              }
           }else{
               next();
           }
        });

        app.use((req,res,next) => {
            res.locals ={
              account: JSON.parse(sessionstorage.getItem('adminlogin'))  
            };
            next();
        });
        // admin
        const adminRouteAccount = require('./routes/account');
        const adminRouteCategory = require('./routes/category');
        const adminRouteTours = require('./routes/tours');

        app.use('/admin/account', adminRouteAccount);
        app.use('/admin/category', adminRouteCategory);
        app.use('/admin/tours', adminRouteTours);
    }
    next();
});
// mở cổng
app.listen(3000, () => {
    console.log('mở cổng 3000');
});