const { execSync, exec } = require('child_process');
const fs = require('fs');
const _ = require('lodash');
const config = require('./config');

function start() {
    if(!fs.existsSync(config.dbPath)) {
        execSync(`mkdir ${config.dbPath}`);
        console.log(`mkdir ${config.dbPath} for mongoDB`);
    }
    try {
        execSync('netstat -ano|findstr "27017"');
        console.log('mongoDB has started ^_^');
    } catch(e) {
        console.log('start mongoDB --- [DO NOT CLOSE IT] ');
        exec(`mongod --dbpath=${config.dbPath}`);
    }
}
start();
// module.exports = start;