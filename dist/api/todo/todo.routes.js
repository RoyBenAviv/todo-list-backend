"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('./todo.controller');
const router = express_1.default.Router();
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', removeTodo);
module.exports = router;
