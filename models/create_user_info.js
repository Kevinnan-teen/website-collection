const sqlite3 = require('sqlite3');
const path    = require('path');
const crypto = require('crypto');
const { argv } = require('process');

let username = ''
let password = '';

const argvs = process.argv.slice(2);
if(argvs.length !== 2){
    console.log('please input username and password');
    process.exit(-1);
}else{
    username = argvs[0];
    password = argvs[1];
}

const database_path = 'production_data.db';
const db_name = path.join(__dirname, database_path);


const db = new sqlite3.Database(db_name, err => {
    if(err)
        console.log(err);
    else
        console.log("open database successfully!");
})

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
