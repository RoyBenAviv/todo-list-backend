import { Todo } from "../../models/todo.model"

const dbService = require('../../services/db')
const logger = require('../../services/logger')
const {ObjectId} = require('mongodb')

async function query() {
    try {
        const collection = await dbService.getCollection('todo')
        var todos: Todo[] = await collection.find().toArray()
        return todos
    } catch (err) {
        logger.error('cannot find todos', err)
        throw err
    }
}

async function getById(todoId: string) {
    try {
        const collection = await dbService.getCollection('todo')
        const todo: Todo = collection.findOne({ '_id': ObjectId(todoId) })
        return todo
    } catch (err) {
        logger.error(`while finding todo ${todoId}`, err)
        throw err
    }
}

async function remove(todoId: string) {
    try {
        const collection = await dbService.getCollection('todo')
        await collection.deleteOne({ '_id': ObjectId(todoId) })
        return todoId
    } catch (err) {
        logger.error(`cannot remove todo ${todoId}`, err)
        throw err
    }
}

async function add(todo: Todo) {
    try {
        const collection = await dbService.getCollection('todo')
        const {ops} = await collection.insertOne(todo)
        return ops[0]
    } catch (err) {
        logger.error('cannot insert todo', err)
        throw err
    }
}
async function update(todo: Todo) {
    try {
        var id: string = ObjectId(todo._id)
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