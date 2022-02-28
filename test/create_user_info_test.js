const path = require('path');
const crypto = require('crypto');
const sqlite3 = require('sqlite3');

const {createUserTable} = require('../models/create_user_info');

const db_name = path.join(__dirname, './test_data.db');

const db = new sqlite3.Database(db_name, err => {
    if(err)
        console.log(err);
    else
        console.log("open database successfully!");
})

async function createUserTableTest(){
    await createUserTable(db_name)
    .then((data) => {

    }).catch(err => {

    })
}

createUserTableTest();


let username = "nachr";
let password = "123456";

const hash = crypto.createHash('md5');
hash.update(password);
var password_hash = hash.digest('hex');
console.log(password_hash);

const i_sql = `
    INSERT INTO user_info
    (username, password)
    VALUES(?, ?)
`;

db.run(i_sql, [username, password_hash], err => {
    if(err)
        console.log(err);
    else
        console.log("insert user info table successfully!");
})



