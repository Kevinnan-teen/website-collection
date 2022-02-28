//koa、路由、静态资源、ejs模板渲染、post/get解析
const Koa = require('koa');
const Static = require('koa-static');
const Views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const Koa_session = require('koa-session');

const path = require('path');

const passport = require('./utils/passport');
const router = require('./routers/index');

const app = new Koa();

//加载静态资源中间件
app.use(Static(
    path.join(__dirname, './public')
))

//加载ejs模板引擎
app.use(Views(path.join(__dirname, './views'),{
    extension: 'ejs'
}))

//加载请求解析中间件
app.use(bodyParser());

const CONFIG = {
    key: 'koa.sess',
    maxAge: 24*60*60*1000,    //ms
    httpOnly: true,
    rolling: true
}

const session_signed_key = ['some_secret_hurr'];
const session = Koa_session(CONFIG, app);
app.keys = session_signed_key;

app.use(session);

app.use(passport.initialize()) // 初始化 passport
app.use(passport.session()) // 存储用户登录的 session 信息 持久登录会话


//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
    console.log('starting...');
})
