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

async function getById(todoId) {
    try {
        const collection = await dbService.getCollection('todo')
        const todo = collection.findOne({ '_id': ObjectId(todoId) })
        return todo
    } catch (err) {
        logger.error(`while finding todo ${todoId}`, err)
        throw err
    }
}

async function remove(todoId) {
    try {
        const collection = await dbService.getCollection('todo')
        await collection.deleteOne({ '_id': ObjectId(todoId) })
        return todoId
    } catch (err) {
        logger.error(`cannot remove todo ${todoId}`, err)
        throw err
    }
}

async function add(todo) {
    try {
        const collection = await dbService.getCollection('todo')
        const {ops} = await collection.insertOne(todo)
        return ops[0]
    } catch (err) {
        logger.error('cannot insert todo', err)
        throw err
    }
}
async function update(todo) {
    try {
        var id = ObjectId(todo._id)
        delete todo._id
        const collection = await dbService.getCollection('todo')
        await collection.updateOne({ "_id": id }, { $set: { ...todo } })
        todo._id = id
        return todo
    } catch (err) {
        logger.error(`cannot update todo`, err)
        throw err
    }
}

declare var module: NodeModule;

module.exports = {
    query,
    getById,
    add,
    update,
    remove
  }