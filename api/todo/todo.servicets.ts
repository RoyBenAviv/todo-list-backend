const dbService = require('../../services/db')
const logger = require('../../services/logger')
const {ObjectId} = require('mongodb')

async function query() {
    try {
        const collection = await dbService.getCollection('todo')
        var todos = await collection.find().toArray()
        return todos
    } catch (err) {
        logger.error('cannot find todos', err)
        throw err
    }
}

declare var module: NodeModule;

module.exports = {
    query,
  }