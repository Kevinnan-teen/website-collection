const {findData, insertData, deleteData, updateData} = require('../models/sql_exec');


let websiteInfoRender = async function(ctx){
    if(ctx.isAuthenticated()){
        console.log('已认证')
        await ctx.render('website_info');
    }else{
        ctx.redirect('/login');
    }
}

let websiteInfoGetAPI = async function(ctx){
    if(ctx.isAuthenticated()){
        //查询子页面数
        const f_sql = `
            SELECT website_info.website_title, COUNT(*) AS "sub_page_num"
            FROM website_info JOIN sub_page_info
            ON website_info.website_title = sub_page_info.website_title
            GROUP BY website_info.website_title
        `;
        const f_sql_2 = `
            SELECT * from website_info;
        `;
    
        let data_list = await findData(f_sql_2);
        let website_sub_page_list = await findData(f_sql);
        let data_list2 = [];
        for(var i = 0; i < data_list.length; i++){
            var temp_data_json = {
                website_head:{
                    website_title: data_list[i].website_title,
                    website_url: data_list[i].website_url
                },
                website_detail: data_list[i].website_detail,
                website_class_1: data_list[i].website_class_1,
                website_class_2: data_list[i].website_class_2,
                sub_page_num: 0
            }
            data_list2.push(temp_data_json);
        }
        for(var sub_page_data of website_sub_page_list){
            for(var website_data of data_list2){
                if(sub_page_data.website_title === website_data.website_head.website_title){
                    website_data.sub_page_num = sub_page_data.sub_page_num;
                    break;
                }
            }
        }
        // console.log(data_list2);
        let return_data = {
            code: 0,
            msg: "成功",
            count: data_list2.length,
            data: data_list2
        };
        ctx.body = return_data;
    }else{
        ctx.redirect('/login');
    }
}

let AddWebsiteInfo = async function(ctx){
    if(ctx.isAuthenticated()){
        const f_sql = `
            SELECT website_class_child, website_class_parent FROM website_class_info
        `;
        let data_list = await findData(f_sql);
        let class_parent_list = [];
        for(var i = 0; i < data_list.length; i++){
            if(data_list[i].website_class_parent == null)
                class_parent_list.push(data_list[i].website_class_child);
        }

        //返回给add_website_info.ejs 的渲染数据
        //[{一级目录, 二级目录}
        let class_data_list = [];
        for(var i = 0; i < class_parent_list.length; i++){
            var class_data_json = {
                class_parent: class_parent_list[i],
                class_child : []
            }
            for(var j = 0; j < data_list.length; j++){
                if(data_list[j].website_class_parent == class_parent_list[i])
                    class_data_json.class_child.push(data_list[j].website_class_child);
            }
            class_data_list.push(class_data_json);
        }
        // console.log(class_data_list);
        await ctx.render('add_website_info', {
            class_data_list,
        });
    }else{
        ctx.redirect('/login');
    }
}

let websiteInfoPostAPI = async function(ctx){
    if(ctx.isAuthenticated()){
        // console.log('/aip/website-info-post');
        let post_data = ctx.request.body;
        // console.log(post_data);
        const i_sql = `
            INSERT INTO website_info
            (website_url, website_title, website_detail,
            website_class_1, website_class_2)
            VALUES(?, ?, ?, ?, ?)
        `;
        const i_data = [
            post_data.website_url,
            post_data.website_title,
            post_data.website_detail,
            post_data.website_class_1,
            post_data.website_class_2
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

let modifyWebsiteInfo = async function(ctx){
    if(ctx.isAuthenticated()){
        const f_sql = `
            SELECT website_class_child, website_class_parent FROM website_class_info
        `;
        let data_list = await findData(f_sql);
        let class_parent_list = [];
        for(var i = 0; i < data_list.length; i++){
            if(data_list[i].website_class_parent == null)
                class_parent_list.push(data_list[i].website_class_child);
        }

        //返回给add_website_info.ejs 的渲染数据
        //[{一级目录, 二级目录}
        let class_data_list = [];
        for(var i = 0; i < class_parent_list.length; i++){
            var class_data_json = {
                class_parent: class_parent_list[i],
                class_child : []
            }
            for(var j = 0; j < data_list.length; j++){
                if(data_list[j].website_class_parent == class_parent_list[i])
                    class_data_json.class_child.push(data_list[j].website_class_child);
            }
            class_data_list.push(class_data_json);
        }
        // console.log(class_data_list);
        await ctx.render('modify_website_info', {
            class_data_list,
        });        
    }else{
        ctx.redirect('/login');
    }
}

let deleteWebsiteInfoPostAPI = async function(ctx){
    if(ctx.isAuthenticated()){
        let delete_data = ctx.request.body;
        // console.log(delete_data);
        let sql = 
            'DELETE FROM website_info WHERE website_title = "' + delete_data.website_title + '"';
        ;
        var d_judge = 0;
        await deleteData(sql)
        .then(r => {
            d_judge = 0;
        }).catch(r => {
            d_judge = -1;
        })
        ctx.body = {
            d_judge : d_judge,
        }
    }else{
        ctx.redirect('/login');
    }
}

let modifyWebsiteInfoPostAPI = async function(ctx){
    if(ctx.isAuthenticated()){        
        let post_data = ctx.request.body;
        console.log(post_data);
        const update_sql = 'UPDATE website_info SET website_url=' + '"' + post_data.website_url + '", ' + 
                           'website_detail=' + '"' + post_data.website_detail + '", ' + "website_class_1=" + 
                           '"' + post_data.website_class_1 + '", ' + 'website_class_2=' + '"' + 
                           post_data.website_class_2 + '" ' + 'WHERE website_title=' + '"' + post_data.website_title + '"';        
        var m_judge = 0;
        await updateData(update_sql)
        .then(r => {
            m_judge = 0;
        })
        .catch(err => {
            m_judge = -1;
        })
        ctx.body = {
            "m_judge": m_judge,
        }
    }else{
        ctx.redirect('/login');
    }
}

module.exports = {websiteInfoRender, websiteInfoGetAPI, modifyWebsiteInfo, AddWebsiteInfo, 
                  websiteInfoPostAPI, deleteWebsiteInfoPostAPI, modifyWebsiteInfoPostAPI}