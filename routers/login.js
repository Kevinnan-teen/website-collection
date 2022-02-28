const Router = require('koa-router');

const {loginRender, loginPostAPI, logoutGetAPI} = require('../controllers/login')

let login_router = new Router();

login_router.get('login', loginRender)
.post('api/login-post', loginPostAPI)
.get('api/logout', logoutGetAPI)

module.exports = login_router