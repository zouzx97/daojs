const { execSync, exec } = require('child_process');
const fs = require('fs');
const _ = require('lodash');
const config = require('./config');

function start() {
    if(!fs.existsSync(config.dbPath)) {
        fs.mkdirSync(config.dbPath);
    }
    try {
        execSync('netstat -ano|findstr "27017"');
    } catch(e) {
        exec(`mongod --dbpath=${config.dbPath}`);
    }
}
start();
// module.exports = start;