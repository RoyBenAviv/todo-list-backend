const todoService = require('./todo.services')
async function getTodos(req, res): Promise<any> {
    try {
        var queryParams = req.query;
        const todos = await todoService.query(queryParams)
        res.json(todos);
      } catch (err) {
        console.error('Failed to get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
      }
}

async function getTodoById(req, res) {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getById(todoId)
    res.json(todo)
  } catch (err) {
    console.error('Failed to get todo', err)
    res.status(500).send({ err: 'Failed to get todo' })
  }
}

async function addTodo(req, res) {
  try {
    const todo = req.body;
    const addedTodo = await todoService.add(todo)
    res.json(addedTodo)
  } catch (err) {
    console.error('Failed to add todo', err)
    res.status(500).send({ err: 'Failed to add todo' })
  }
}

async function updateTodo(req, res) {
  try {
    const todo = req.body;
    const updatedTodo = await todoService.update(todo)
    res.json(updatedTodo)
  } catch (err) {
    console.error('Failed to update todo', err)
    res.status(500).send({ err: 'Failed to update todo' })

  }
}

async function removeTodo(req, res) {
  try {
    const todoId = req.params.id;
    const removedId = await todoService.remove(todoId)
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