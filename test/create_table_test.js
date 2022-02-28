const sqlite3 = require('sqlite3');
const path    = require('path');

const {createTable} = require('../models/create_table');

const db_name = path.join(__dirname, 'test_data.db');


async function createTableTest(){
    await createTable(db_name);
}

createTableTest();





