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

app.get('/messages', ({ query: { cursor = '' } }, res: Response) => {
  const messages = readData('messages')
  const fromIndex =
    messages.findIndex((message: any) => message.id === cursor) + 1
  res.send(messages.slice(fromIndex, fromIndex + 15))
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
