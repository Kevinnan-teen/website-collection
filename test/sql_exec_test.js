const sqlite3 = require('sqlite3');
const path    = require('path');

const {insertData, findData} = require('../models/sql_exec');

const db_name = path.join(__dirname, './test_data.db');


//process.exit();


const db = new sqlite3.Database(db_name, err => {
    if(err)
        console.log(err);
    else
        console.log('open database successfully!');
});

// 如果将表字段数据类型设置为 VARCHAR(n)，如果长度超过n，
// 由于sqlite3亲和数据类型的影响，VARCHAR(n)会变为TEXT数据类型
// TEXT支持最大数据长度1000000
i_data = [
    ["https://www.baidu.com/", "百度", "中文最大搜索引擎",
    "工具类"],
    ["https://www.bilibili.com/", "哔哩哔哩", "中文综合视频网站",
    "工具类"],
    ["https://www.douyu.com/", "斗鱼", "斗鱼直播平台",
    "娱乐类"],
]


i_sql = `
    INSERT INTO website_info
    (website_url, website_title, website_detail,
     website_class_1, website_class_2)
     VALUES(?, ?, ?, ?, ?)
`;

find_sql = `
    SELECT * FROM website_info
`;


i_data2 = [
    ["https://www.bilibili.com/", "https://www.bilibili.com/video/BV1Fm4y1R7sK?spm_id_from=333.851.b_7265636f6d6d656e64.1",
    "【中低配福音】APEX英雄史诗级帧数优化教程"],
    ["https://www.bilibili.com/", "https://www.bilibili.com/video/BV1vL411K7UN?spm_id_from=333.851.b_7265636f6d6d656e64.2",
    "【STN快报第六季21】为了拯救工作室！白金竟说自己可以出来卖！"],
    ["https://www.douyu.com/", "https://www.douyu.com/2465555", "斗鱼13少直播间"]
]

i_sql2 = `
    INSERT INTO sub_page_info
    (website_url, sub_page_url, sub_page_title)
    VALUES(?, ?, ?)
`;

find_sql2 = `
    SELECT * FROM sub_page_info
`;


//website_info 和 sub_page_info JOIN
find_sql_join = `
    SELECT website_info.website_url, website_title,
    website_detail, COUNT(*) AS "nums"
    FROM website_info JOIN sub_page_info
    ON website_info.website_url = sub_page_info.website_url
    GROUP BY website_info.website_url
`;


i_data3 = [
    ["编程", "program", null, "编程相关网站"],
    ["C++", "cpp", "编程", "C++资源"],
    ["JavaScript", "javascript", "编程", "JavaScript相关资源"],
    ["算法", "alogrithm", null, "算法相关资源"],
    ["音视频", "av", "算法", "音视频相关"]
]

i_sql3 = `
    INSERT INTO website_class_info
    (website_class_child, website_class_abbreviation, website_class_parent, website_class_detail)
    VALUES(?, ?, ?, ?)
`;

find_sql3 = `
    SELECT* FROM website_class_info
`;



async function insertDataTest(i_sql, i_data){
    var val;
    for(i = 0; i < i_data.length; i++){
        val = await insertData(db, i_sql, i_data[i]);
    }
    return val;
}

async function findDataTest(find_sql){
    let data_list = await findData(db, find_sql);
    return data_list;
}


insertDataTest(i_sql, i_data)
.then((data) => {
findDataTest(find_sql)
.then((data) => {
console.log(data);
insertDataTest(i_sql2, i_data2)
.then((data) => {
findDataTest(find_sql2)
.then((data) => {
console.log(data);
findDataTest(find_sql_join)
.then((data) => {
console.log(data);
insertDataTest(i_sql3, i_data3)
.then((data) => {
findDataTest(find_sql3)
.then((data) => {
console.log(data);
})
})
})
})
})
})
});



