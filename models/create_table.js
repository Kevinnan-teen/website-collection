const sqlite3 = require('sqlite3');
const path    = require('path');


//网站数据表
//website_url     : 网站地址
//website_title   : 网站标题（主键）
//website_detail  : 网站描述
//website_class_1 : 一级分类目录
//website_class_2 : 二级分类目录（可为空）
const create_website_info_table_sql = `
    CREATE TABLE website_info(
        website_url VARCHAR(100) NOT NULL,
        website_title VARCHAR(20) NOT NULL PRIMARY KEY,
        website_detail VARCHAR(200) NOT NULL,
        website_class_1 CHAR(20) NOT NULL,
        website_class_2 CHAR(20)
    )
`;

//网站子页面数据
//website_title  : 网站标题（主键）
//sub_page_url   : 子页面地址（主键）
//sub_page_title : 子页面标题
const create_sub_page_info_table_sql = `
    CREATE TABLE sub_page_info(
        website_title VARCHAR(100) NOT NULL,
        sub_page_url VARCHAR(100) NOT NULL,
        sub_page_title VARCHAR(50) NOT NULL,
        PRIMARY KEY(website_title, sub_page_url)
    )
`;


//网站分类
//website_class_child        : 子分类目录
//website_class_abbreviation : 子分类缩略，用于生成链接
//website_class_parent       : 新添加分类的父类
//website_class_detail       : 分类描述
const create_class_info_table_sql = `
    CREATE TABLE website_class_info(
        website_class_child CHAR(20) NOT NULL PRIMARY KEY,
        website_class_abbreviation VARCHAR(20) NOT NULL,
        website_class_parent CHAR(20),
        website_class_detail VARCHAR(200)
    )
`;


//用户信息表
//username : 用户名
//passowrd : 加密过的用户密码
const create_user_info_table_sql = `
    CREATE TABLE user_info(
        username VARCHAR(20) NOT NULL PRIMARY KEY,
        password VARCHAR(30) NOT NULL
    )
`;


let createTable = function(db_name){
    return new Promise((resolve, reject) => {
        //const db_name = path.join(__dirname, data_path);

        const db = new sqlite3.Database(db_name, err => {
            if(err)
                console.log(err);
            else
                console.log("create database successfully!");
        })

        db.run(create_website_info_table_sql, err => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                console.log("create website info table successfully!");
        })

        db.run(create_sub_page_info_table_sql, err => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                console.log("create sub page info table successfully!");
        })

        db.run(create_class_info_table_sql, err => {
            if(err){
                console.log(err);
                reject(err);
            }else
                console.log("create website class info table successfully!");
        })

        db.run(create_user_info_table_sql, err => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('create user info table successfully!');
            }
        })

        resolve(true);
    })
}


const database_path = 'production_data.db';

const db_name = path.join(__dirname, database_path);


async function createTableTest(){
    await createTable(db_name);
}

createTableTest();

// module.exports = {createTable};




