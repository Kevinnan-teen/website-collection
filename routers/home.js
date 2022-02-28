const Router = require('koa-router');

const {indexRender, allInfoPostAPI, getSessionStatus} = require('../controllers/home');

//主路由
let home = new Router();
home.get('/', indexRender)
.post('api/all-info', allInfoPostAPI)
.post('api/session-status', getSessionStatus)

module.exports = home