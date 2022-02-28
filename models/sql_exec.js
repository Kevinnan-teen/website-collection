const sqlite3 = require('sqlite3');
const path    = require('path');

//打开/创建 数据库
const database_path = 'production_data.db';
const db_name = path.join(__dirname, database_path);

const db = new sqlite3.Database(db_name, err => {
    if(err)
        console.log(err);
    else
        console.log('open database successfully!');
});



let insertData = function(sql_query, params){
    return new Promise((resolve, reject) =>{
        db.run(sql_query, params, err => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('insert successfully!');
                resolve(true);
            }
        })
    });
}

let findData = function(sql_query){
    return new Promise((resolve, reject) => {
        db.all(sql_query, (err, rows) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log("find successfully!");
                resolve(rows);
            }
        })
    })
}

let deleteData = function(sql_query){
    return new Promise((resolve, reject) => {
        db.run(sql_query, err => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('delete successfully!');
                resolve(true);
            }
        })
    })
}

let updateData = function(sql_query){
    return new Promise((resolve, reject) => {
        db.run(sql_query, err => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log('update successfully!');
                resolve(true);
            }
        })
    })
}


module.exports = {insertData, findData, deleteData, updateData};
