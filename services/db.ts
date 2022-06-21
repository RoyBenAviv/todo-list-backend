const  { MongoClient } = require('mongodb')

const dbConfig = require('../config')

module.exports = {
    getCollection
}

const dbName: string = 'todo-list'

var dbConn = null

async function getCollection(collectionName): Promise<any> {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect(): Promise<any> {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbConfig.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.error('Cannot Connect to DB', err)
        throw err
    }
}