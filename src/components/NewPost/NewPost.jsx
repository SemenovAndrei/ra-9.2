import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Post = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background-color: white;

  a {
    align-self: flex-end;
    font-size: inherit;
    padding: 10px;
    cursor: pointer;
    color: white;
    background-color: #7171ff;
    text-decoration: none;
  }

  a.close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: inherit;
    padding: 10px;
    cursor: pointer;
    color: #c0c0c0;
    background-color: inherit;
    border-style: none;
  }

  .empty {
    border-color: red;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  padding-right: 40px;
  font-size: 1.5rem;
  resize: none;
  margin-bottom: 15px;
  border: 1px solid rgb(202, 202, 202);
`

export default function NewPost() {
  const textarea = useRef(null)

  const onClick = (event) => {
    if (!textarea.current.value) {
      event.preventDefault()

      if (!textarea.current.classList.contains('empty')) {
        textarea.current.classList.add('empty')
        return
      }
    }

    uploadPost()
  }

  const uploadPost = async () => {
    try {
      const response = await fetch('http://localhost:7777/posts', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({ id: 0, content: textarea.current.value }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Post>
      <Link to="/" className="close">
        X
      </Link>
      <TextArea ref={textarea} rows="10"></TextArea>
      <Link to="/" onClick={onClick}>
        Опубликовать
      </Link>
    </Post>
  )
}
