import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { readData, writeData } from './controllers'
import { v4 } from 'uuid'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.get('/messages', (req: Request, res: Response) => {
  const messages = readData('messages')
  res.send(messages)
})

app.post('/messages', ({ body }, res: Response) => {
  const messages = readData('messages')
  const newMessage = {
    id: v4(),
    userId: body.userId,
    text: body.text,
    timestamp: Date.now(),
  }
  messages.unshift(newMessage)
  writeData('messages', messages)
  res.send(newMessage)
})

app.listen(8000, () => console.log('Server start!'))
