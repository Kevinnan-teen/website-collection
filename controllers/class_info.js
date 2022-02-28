const {findData, insertData} = require('../models/sql_exec');

let classInfoRender = async function(ctx){
    if(ctx.isAuthenticated()){        
        await ctx.render('class_info');
    }else{
        ctx.redirect('/login');
    }
}


let classInfoGetAPI = async function(ctx){
    if(ctx.isAuthenticated()){        
        let sql = `SELECT * FROM website_class_info`;
        let data_list = await findData(sql);
        // console.log(data_list);

        let return_data = {
            code: 0,
            msg: "成功",
            count: data_list.length,
            data: data_list
        };
        ctx.body = return_data;
    }else{
        ctx.redirect('/login');
    }    
}

let addClassInfoRender = async function(ctx){
    if(ctx.isAuthenticated()){        
        //找到父类
        //由于只支持二级目录，因此父类只能是一级目录
        //所以，sql限制条件为 website_class_parent 为 null 即为父类
        const find_class_info_sql = `
            SELECT * FROM website_class_info where website_class_parent is null
        `;
        let data_list = await findData(find_class_info_sql);
        // console.log(data_list);
        //ejs渲染，传参：category_data
        let category_data = [];
        for(var i = 0; i < data_list.length; i++){
            category_data.push(data_list[i].website_class_child);
        }
        await ctx.render('add_class_info', {
            category_data,
        });
    }else{
        ctx.redirect('/login');
    }
}

let websiteClassPostAPI = async function(ctx){
    if(ctx.isAuthenticated()){        
        // console.log('/api/wesite-class-post');
        let post_data = ctx.request.body;
        if(post_data.website_class_parent == 0)
            post_data.website_class_parent = null;
        // console.log(post_data);
        const i_sql = `
            INSERT INTO website_class_info
            (website_class_child, website_class_abbreviation, website_class_parent, website_class_detail)
            VALUES(?, ?, ?, ?)
        `;
        const i_data = [
            post_data.website_class_child,
            post_data.website_class_abbreviation,
            post_data.website_class_parent,
            post_data.website_class_detail
        ];
        let i_judge = 0;
        await insertData(i_sql, i_data)
        .then(r => {
            console.log("true");
        }).catch(err => {
            i_judge = 19;
            console.log(err);
        })
        ctx.body = {
            i_judge : i_judge
        }
    }else{
        ctx.redirect('/login');
    }    
}

module.exports = {classInfoRender, classInfoGetAPI, addClassInfoRender, websiteClassPostAPI}