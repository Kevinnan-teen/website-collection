const passport = require('../utils/passport');

let loginRender = async function(ctx){
    await ctx.render('login');
}

let loginPostAPI = async function(ctx, next){
    return passport.authenticate('local', function(err, user, info){
        if(err){
            ctx.body = {
                code: -1,
                msg: err
            }
        }else if(user){
            ctx.body = {
                code:0,
                user,
                msg:info
            }
            //ctx.redirect('/website_info');
            return ctx.login(user)
        }else{
            ctx.body = {
                code:1,
                msg: info
            }
        }
    })(ctx, next);
}

let logoutGetAPI = async function(ctx, next){
    await ctx.logout();
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: 0
        }
        ctx.session = null;      
        ctx.redirect('/');
    }else{
        ctx.body = {
            code: -1
        }
    }
}

module.exports = {loginRender, loginPostAPI, logoutGetAPI}