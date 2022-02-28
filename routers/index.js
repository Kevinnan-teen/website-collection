const Router = require('koa-router');

const home = require('./home');
const login_router = require('./login');
const website_info_router = require('./website_info');
const sub_page_info_router = require('./sub_page_info');
const class_info_router = require('./class_info');


//装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/', login_router.routes(),
                class_info_router.allowedMethods());
router.use('/', website_info_router.routes(),
                website_info_router.allowedMethods());
router.use('/', sub_page_info_router.routes(),
                sub_page_info_router.allowedMethods());
router.use('/', class_info_router.routes(),
                class_info_router.allowedMethods());


module.exports = router