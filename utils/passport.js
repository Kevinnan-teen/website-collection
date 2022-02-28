const crypto = require('crypto');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const {findData} = require('../models/sql_exec');


//通过passport.serializeUser定义序列化操作
//在调用ctx.login()时会触发序列化操作，把用户对象存储在session中
passport.serializeUser(function(user, done){
    done(null, user);
})

//通过passport.deserializeUser定义反序列化操作
passport.deserializeUser(function(user, done){
    done(null, user);
})

//提交数据
passport.use(new LocalStrategy(async function(username, password, done){
    const f_sql = `
        SELECT * FROM user_info
    `;
    const user = await findData(f_sql);
    // console.log(user);
    const hash = crypto.createHash('md5');
    hash.update(password);
    let password_hash = hash.digest('hex');
    if(username !== user[0].username){
        return done(null, false, '用户不存在');
    }
    if(password_hash  === user[0].password){
        console.log('load success.');
        return done(null, user[0], '登录成功');
    }else{
        return done(null, false, '密码错误');
    }
}))

module.exports = passport
