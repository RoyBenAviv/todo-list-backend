import express, { Application, Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import { Cors } from './models/cors.model'

const app: Application = express()
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions: Cors = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const todoRoutes = require('./api/todo/todo.routes')
app.use('/api/todo', todoRoutes);


app.get('/**', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger');
const port: string | number = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
