import express, { Router } from 'express'
const { getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('./todo.controller')

const router: Router = express.Router()


router.get('/', getTodos)
router.get('/:id', getTodoById)
router.post('/', addTodo)
router.put('/:id', updateTodo)
router.delete('/:id', removeTodo)

module.exports = router