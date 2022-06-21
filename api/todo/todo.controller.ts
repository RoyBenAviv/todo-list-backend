const todoService = require('./todo.servicets')

async function getTodos(req, res): Promise<any> {
    try {
        var queryParams = req.query;
        const todos = await todoService.query(queryParams)
        res.json(todos);
      } catch (err) {
        logger.error('Failed to get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
      }
}
declare var module: NodeModule;

module.exports = {
    getTodos
  }