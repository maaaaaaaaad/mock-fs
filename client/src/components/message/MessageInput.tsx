import React, { memo, useRef } from 'react'

interface IMessageInput {
  mutate: (text: string) => void
}

const MessageInput: React.FC<IMessageInput> = memo(({ mutate }) => {
  const textRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const text = textRef.current?.value
    text && mutate(text)
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea ref={textRef} placeholder="...message" />
      <button type="submit">SEND</button>
    </form>
  )
})

export default MessageInput
