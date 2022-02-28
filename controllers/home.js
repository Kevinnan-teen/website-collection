const {findData} = require('../models/sql_exec');

let indexRender = async function(ctx){
    // console.log('index');
    const query_class_sql = `
        SELECT website_class_child, website_class_parent FROM website_class_info
    `;
    let data_list = await findData(query_class_sql);
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
    //console.log(class_data_list);
    await ctx.render('index', {
        class_data_list,
    })
}

let allInfoPostAPI = async function(ctx){
    // console.log('/api/all-info')
    let post_data = ctx.request.body;
    // console.log(post_data);
    const query_sql_1 = `
        SELECT website_info.website_url, website_info.website_title,
        website_detail, sub_page_url, sub_page_title
        FROM website_info JOIN sub_page_info
        ON website_info.website_title = sub_page_info.website_title
        WHERE website_info.website_class_2 = "` + post_data.website_class + '"';
    let data_list_1 = await findData(query_sql_1);
    // console.log(data_list_1);
    const query_sql_2 = `
        SELECT website_info.website_url, website_info.website_title,
        website_detail, sub_page_url, sub_page_title
        FROM website_info JOIN sub_page_info
        ON website_info.website_title = sub_page_info.website_title
        WHERE website_info.website_class_1 = "` + post_data.website_class + '"' +
        'and website_class_2 = ""';
    let data_list_2 = await findData(query_sql_2);
    // console.log(data_list_2);
    const query_sql_3 = `
        SELECT website_url, website_title, website_detail
        FROM website_info where website_class_2 = "` +
        post_data.website_class + '"';
    let data_list_3 = await findData(query_sql_3);
    // console.log(data_list_3);
    const query_sql_4 = `
        SELECT website_url, website_title, website_detail
        FROM website_info where website_class_1 = "` +
        post_data.website_class + '"' + 'and website_class_2 = ""';
    let data_list_4 = await findData(query_sql_4);
    // console.log(data_list_4);

    let data_list = [];
    data_list.push(data_list_1);
    data_list.push(data_list_2);
    data_list.push(data_list_3);
    data_list.push(data_list_4);
    let data_map = new Map();

    for(var i = 0; i < data_list.length; i++){
        for(var j = 0; j < data_list[i].length; j++){
            if(!data_map.has(data_list[i][j].website_title)){
                data_map.set(data_list[i][j].website_title,{
                    "website_title": data_list[i][j].website_title,
                    "website_url": data_list[i][j].website_url,
                    "website_detail": data_list[i][j].website_detail,
                    "sub_page": [],
                })
            }
            if(data_list[i][j].sub_page_title != null){
                var temp_data_json = data_map.get(
                    data_list[i][j].website_title);
                temp_data_json.sub_page.push({
                    "sub_page_title": data_list[i][j].sub_page_title,
                    "sub_page_url": data_list[i][j].sub_page_url
                });
                //console.log(temp_data_json);
                data_map.set(data_list[i][j].website_title, temp_data_json);
            }
        }
    }
    // console.log(data_map);
    let website_info_data = [];
    for(var [key, value] of data_map){
        website_info_data.push(value);
    }
    ctx.body = website_info_data;
}

let getSessionStatus = async function(ctx){    
    if(ctx.isAuthenticated()){
        ctx.body = {
            load: true,
            username: ctx.state.user.username
        }
    }else{
        ctx.body = {
            load: false
        }
    }
}


module.exports = {indexRender, allInfoPostAPI, getSessionStatus}