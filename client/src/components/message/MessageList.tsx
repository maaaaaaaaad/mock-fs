import React, { useEffect, useRef, useState } from 'react'
import MessageItem from './MessageItem'
import MessageInput from './MessageInput'
import axios from 'axios'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

const MessageList = () => {
  const [msgs, setMsgs] = useState<any[]>([])
  const fetchMoreElement = useRef<HTMLDivElement>(null)
  const intersecting = useInfiniteScroll(fetchMoreElement)

  const getMessages = async () => {
    const { data: messages } = await axios.get('http://localhost:8000/messages')
    setMsgs(messages)
  }

  useEffect(() => {
    getMessages()
  }, [])

  const onCreateMessage = async (text: string) => {
    const newMessage = {
      userId: 'woongs',
      text,
    }

    const { data: newMsg } = await axios.post(
      'http://localhost:8000/messages',
      newMessage,
    )

    setMsgs((msgs) => [newMsg, ...msgs])
  }

  return (
    <>
      <MessageInput mutate={onCreateMessage} />
      <ul>
        {msgs.map((x: any) => (
          <MessageItem key={x.id} {...x} />
        ))}
      </ul>
      <div ref={fetchMoreElement} />
    </>
  )
}

export default MessageList
