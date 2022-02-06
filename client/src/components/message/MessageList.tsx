import React, { useState } from 'react'
import MessageItem from './MessageItem'
import MessageInput from './MessageInput'

const userIdSet = ['dong', 'oh']
const getRandomUserId = () => userIdSet[Math.round(Math.random())]

const message = Array(60)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    userId: getRandomUserId(),
    text: `mock data ${i + 1}`,
    timestamp: Date.now(),
  }))

const MessageList = () => {
  const [msgs, setMsgs] = useState(message)

  const onCreateMessage = (text: string) => {
    const newMessage = {
      id: message.length + 1,
      userId: getRandomUserId(),
      text,
      timestamp: Date.now(),
    }
    setMsgs((msgs) => [newMessage, ...msgs])
  }

  return (
    <>
      <MessageInput mutate={onCreateMessage} />
      <ul>
        {msgs.map((x: any) => (
          <MessageItem key={x.id} {...x} />
        ))}
      </ul>
    </>
  )
}

export default MessageList
