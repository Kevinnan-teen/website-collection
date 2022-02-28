const Router = require('koa-router');

const {websiteInfoRender, websiteInfoGetAPI, modifyWebsiteInfo, AddWebsiteInfo, 
       websiteInfoPostAPI, deleteWebsiteInfoPostAPI, modifyWebsiteInfoPostAPI} = require('../controllers/website_info');

//网站信息和管理页面路由
let website_info_router = new Router();
website_info_router.get('website_info', websiteInfoRender)
.get('api/website-info', websiteInfoGetAPI)
.get('add_website_info', AddWebsiteInfo)
.post('api/website-info-post', websiteInfoPostAPI)
.get('modify_website_info', modifyWebsiteInfo)
.post('api/website-info-delete-post', deleteWebsiteInfoPostAPI)
.post('api/website-info-modify-post', modifyWebsiteInfoPostAPI)

module.exports = website_info_router