'use strict'

const mongo = require('mongodb');
// const conf = require('../conf/mongo_config')

const Database = {
    db : null,
    ObjectId : mongo.ObjectId,
    connect (url) {
        return mongo.MongoClient.connect(url)
            .then(client => {
                this.db = client.db('book_db');
                return Promise.resolve();
            })
            .catch(err => console.log('An error occured while connectiong to mongo:', err));
    }
}

module.exports = Database;