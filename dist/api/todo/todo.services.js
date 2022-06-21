var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dbService = require('../../services/db');
const logger = require('../../services/logger');
const { ObjectId } = require('mongodb');
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('todo');
            var todos = yield collection.find().toArray();
            return todos;
        }
        catch (err) {
            logger.error('cannot find todos', err);
            throw err;
        }
    });
}
function getById(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('todo');
            const todo = collection.findOne({ '_id': ObjectId(todoId) });
            return todo;
        }
        catch (err) {
            logger.error(`while finding todo ${todoId}`, err);
            throw err;
        }
    });
}
function remove(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('todo');
            yield collection.deleteOne({ '_id': ObjectId(todoId) });
            return todoId;
        }
        catch (err) {
            logger.error(`cannot remove todo ${todoId}`, err);
            throw err;
        }
    });
}
function add(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService.getCollection('todo');
            const { ops } = yield collection.insertOne(todo);
            return ops[0];
        }
        catch (err) {
            logger.error('cannot insert todo', err);
            throw err;
        }
    });
}
function update(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var id = ObjectId(todo._id);
            delete todo._id;
            const collection = yield dbService.getCollection('todo');
            yield collection.updateOne({ "_id": id }, { $set: Object.assign({}, todo) });
            todo._id = id;
            return todo;
        }
        catch (err) {
            logger.error(`cannot update todo`, err);
            throw err;
        }
    });
}
module.exports = {
    query,
    getById,
    add,
    update,
    remove
};
