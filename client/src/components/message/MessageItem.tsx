import React from 'react'

interface IMessageItem {
  id: number
  userId: string
  timestamp: string
  text: string
}

const MessageItem: React.FC<IMessageItem> = ({
  id,
  userId,
  timestamp,
  text,
}) => {
  return (
    <>
      <li className="list">
        <span>{id}</span>
        <span>{userId}</span>
        <span>{text}</span>
        <sub>
          {new Date(timestamp).toLocaleString('ko-KR', {
            timeZone: 'UTC',
          })}
        </sub>
      </li>
    </>
  )
}

export default MessageItem
