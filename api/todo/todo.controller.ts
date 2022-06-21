import { Todo } from "../../models/todo.model";
import { Request, Response } from "express";
const todoService = require('./todo.services')


async function getTodos(req: Request, res: Response): Promise<void> {
    try {
        const todos: Todo[] = await todoService.query()
        res.json(todos);
      } catch (err) {
        console.error('Failed to get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
      }
}

async function getTodoById(req: Request, res: Response): Promise<void> {
  try {
    const todoId: string = req.params.id;
    const todo: Todo = await todoService.getById(todoId)
    res.json(todo)
  } catch (err) {
    console.error('Failed to get todo', err)
    res.status(500).send({ err: 'Failed to get todo' })
  }
}

async function addTodo(req: Request, res: Response): Promise<void> {
  try {
    const todo: Todo = req.body;
    const addedTodo: Todo = await todoService.add(todo)
    res.json(addedTodo)
  } catch (err) {
    console.error('Failed to add todo', err)
    res.status(500).send({ err: 'Failed to add todo' })
  }
}

async function updateTodo(req: Request, res: Response): Promise<void> {
  try {
    const todo: Todo = req.body;
    const updatedTodo: Todo = await todoService.update(todo)
    res.json(updatedTodo)
  } catch (err) {
    console.error('Failed to update todo', err)
    res.status(500).send({ err: 'Failed to update todo' })

  }
}

async function removeTodo(req, res): Promise<void> {
  try {
    const todoId: string = req.params.id;
    const removedId: string = await todoService.remove(todoId)
    res.send(removedId)
  } catch (err) {
    console.error('Failed to remove todo', err)
    res.status(500).send({ err: 'Failed to remove todo' })
  }
}


declare var module: NodeModule;

module.exports = {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    removeTodo
  }