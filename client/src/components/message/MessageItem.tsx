import React from 'react'

interface IMessageItem {
  userId: string
  timestamp: string
  text: string
}

const MessageItem: React.FC<IMessageItem> = ({ userId, timestamp, text }) => {
  return (
    <>
      <li className="list">
        <span>{userId} </span>
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
