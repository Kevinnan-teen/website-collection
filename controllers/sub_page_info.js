const {findData, insertData, deleteData} = require('../models/sql_exec');


let subPageInfoRender = async function(ctx){
    if(ctx.isAuthenticated()){
        await ctx.render('sub_page_info');
    }else{
        ctx.redirect('/login');
    }
}

let subPageInfoGetAPI = async function(ctx){
    if(ctx.isAuthenticated()){
        // console.log('/api/sub-page-info');
        const f_sql = `
            SELECT sub_page_title, sub_page_url, website_info.website_url,
            website_info.website_title, website_detail, website_class_1,
            website_class_2
            FROM website_info JOIN sub_page_info
            ON website_info.website_title = sub_page_info.website_title;
        `;
        let data_list = await findData(f_sql);
        // console.log(data_list);

        let data_list2 = [];
        for(var i = 0; i < data_list.length; i++){
            var temp_data_json = {
                sub_page_head:{
                    sub_page_title: data_list[i].sub_page_title,
                    sub_page_url: data_list[i].sub_page_url
                },
                website_head:{
                    website_title: data_list[i].website_title,
                    website_url: data_list[i].website_url
                },
                website_detail: data_list[i].website_detail,
                website_class_1: data_list[i].website_class_1,
                website_class_2: data_list[i].website_class_2
            }
            data_list2.push(temp_data_json);
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

let AddSubPageInfoRender = async function(ctx){
    if(ctx.isAuthenticated()){
        await ctx.render('add_sub_page_info');
    }else{
        ctx.redirect('/login');
    }
}

let subPageInfoPostAPI = async function(ctx){
    // console.log('/api/sub-page-info-post');
    let post_data = ctx.request.body;
    // console.log(post_data);
    const i_sql = `
        INSERT INTO sub_page_info
        (website_title, sub_page_url, sub_page_title)
        VALUES(?, ?, ?)
    `;
    const i_data = [
        post_data.website_title,
        post_data.sub_page_url,
        post_data.sub_page_title
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
}

let deleteSubPageInfoPostAPI = async function(ctx){
    if(ctx.isAuthenticated()){
        let delete_post = ctx.request.body;        
        let sql = 'DELETE FROM sub_page_info WHERE website_title = "' + 
                   delete_post.website_title + '"' + ' and sub_page_title = "' + 
                   delete_post.sub_page_title + '"';
        var d_judge = 0;
        await deleteData(sql)
        .then(r => {
            d_judge = 0;
        })
        .catch(r => {
            d_judge = -1;
        })
        ctx.body = {
            d_judge: d_judge,
        }
    }else{
        ctx.redirect('/login');
    }
}

module.exports = {subPageInfoRender, subPageInfoGetAPI, AddSubPageInfoRender, 
                  subPageInfoPostAPI, deleteSubPageInfoPostAPI}