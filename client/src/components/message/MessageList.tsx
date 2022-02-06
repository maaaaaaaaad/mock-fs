import React, { useEffect, useRef, useState } from 'react'
import MessageItem from './MessageItem'
import MessageInput from './MessageInput'
import axios from 'axios'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

const MessageList = () => {
  const [msgs, setMsgs] = useState<any[]>([])
  const fetchMoreElement = useRef<HTMLDivElement>(null)
  const intersecting = useInfiniteScroll(fetchMoreElement)
  const [hasNext, setHasNext] = useState<boolean>(true)

  const getMessages = async () => {
    const { data: newMsg } = await axios.get('http://localhost:8000/messages', {
      params: { cursor: msgs[msgs.length - 1]?.id || '' },
    })
    if (newMsg.length === 0) {
      setHasNext(false)
      return
    }
    setMsgs((msgs) => [...msgs, ...newMsg])
  }

  useEffect(() => {
    if (intersecting && hasNext) getMessages()
  }, [intersecting])

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
