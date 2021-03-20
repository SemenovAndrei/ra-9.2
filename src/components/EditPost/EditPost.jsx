import React, { useRef, useState } from 'react'
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
const ButtonClose = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: inherit;
  padding: 10px;
  cursor: pointer;
  color: #c0c0c0;
  background-color: inherit;
  border-style: none;
`

export default function EditPost(props) {
  const textarea = useRef(null)

  const [content, setContent] = useState(props.content)

  const onWriteContent = (event) => {
    setContent(event.target.value)
  }

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
      const response = await fetch(process.env.REACT_APP_URL_POSTS, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({ id: props.id, content: content }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onClose = () => {
    props.onClose()
  }

  return (
    <Post>
      <h3>Редактировать пост</h3>
      <ButtonClose onClick={onClose}>X</ButtonClose>
      <TextArea
        ref={textarea}
        rows="10"
        value={content}
        onChange={onWriteContent}
      ></TextArea>
      <Link to="/" onClick={onClick}>
        Сохранить
      </Link>
    </Post>
  )
}
