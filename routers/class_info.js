const Router = require('koa-router');

const {classInfoRender, classInfoGetAPI, 
       addClassInfoRender, websiteClassPostAPI} = require('../controllers/class_info')
       
//分类页面信息和管理页面路由
let class_info_router = new Router();
class_info_router.get('class_info', classInfoRender)
.get('api/class-info', classInfoGetAPI)
.get('add_class_info', addClassInfoRender)
.post('api/website-class-post', websiteClassPostAPI)

module.exports = class_info_router