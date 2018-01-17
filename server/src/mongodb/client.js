const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const config = require('./config');

function create({
    name,
    value,
}) {
    return MongoClient.connect(config.mongodbURL)
        .then((db) => {
            const dbo = db.db(config.dbName);
            dbo.collection(name)
                .insertOne(value)
                .then(() => {
                    db.close();
                })
                .catch(() => {
                    db.close();
                });
        });
}

function get({
    name,
    query = {},
}) {
    return MongoClient.connect(config.mongodbURL)
        .then((db) => {
            const dbo = db.db(config.dbName);
            return dbo.collection(name)
                .find(query)
                .toArray()
                .then((result) => {
                    console.log(`find result(${name}) is: ${JSON.stringify(result)}`);
                    db.close();
                    return result;
                })
                .catch((e) => {
                    console.error(e);
                    db.close();
                });
        });
}

function list() {
    return MongoClient.connect(config.mongodbURL)
        .then((db) => {
            const dbo = db.db(config.dbName);
            return dbo.listCollections()
                .toArray()
                .then((results) => {
                    console.log(`collections are: ${JSON.stringify(results)}`);
                    db.close();
                    return _.map(results, ret => ret.name);
                })
                .catch((e) => {
                    console.error(e);
                    db.close();
                });
        }); 
}

module.exports = {
    get,
    create,
    list,
};
