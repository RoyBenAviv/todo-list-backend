"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoService = require('./todo.services');
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todoService.query();
            res.json(todos);
        }
        catch (err) {
            console.error('Failed to get todos', err);
            res.status(500).send({ err: 'Failed to get todos' });
        }
    });
}
function getTodoById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const todo = yield todoService.getById(todoId);
            res.json(todo);
        }
        catch (err) {
            console.error('Failed to get todo', err);
            res.status(500).send({ err: 'Failed to get todo' });
        }
    });
}
function addTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todo = req.body;
            const addedTodo = yield todoService.add(todo);
            res.json(addedTodo);
        }
        catch (err) {
            console.error('Failed to add todo', err);
            res.status(500).send({ err: 'Failed to add todo' });
        }
    });
}
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todo = req.body;
            const updatedTodo = yield todoService.update(todo);
            res.json(updatedTodo);
        }
        catch (err) {
            console.error('Failed to update todo', err);
            res.status(500).send({ err: 'Failed to update todo' });
        }
    });
}
function removeTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const removedId = yield todoService.remove(todoId);
            res.send(removedId);
        }
        catch (err) {
            console.error('Failed to remove todo', err);
            res.status(500).send({ err: 'Failed to remove todo' });
        }
    });
}
module.exports = {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    removeTodo
};
