import express, { Router } from 'express'
const { getTodos } = require('./todo.controller')

const router: Router = express.Router()


router.get('/', getTodos)

module.exports = router