const Router = require('koa-router');

const {subPageInfoRender, subPageInfoGetAPI, AddSubPageInfoRender, 
       subPageInfoPostAPI, deleteSubPageInfoPostAPI} = require('../controllers/sub_page_info')

//子页面信息和管理页面路由
let sub_page_info_router = new Router();
sub_page_info_router.get('sub_page_info', subPageInfoRender)
.get('api/sub-page-info', subPageInfoGetAPI)
.get('add_sub_page_info', AddSubPageInfoRender)
.post('api/sub-page-info-post', subPageInfoPostAPI)
.post('api/sub-page-info-delete-post', deleteSubPageInfoPostAPI)

module.exports = sub_page_info_router