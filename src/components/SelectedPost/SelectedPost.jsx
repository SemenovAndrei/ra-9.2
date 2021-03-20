import moment from 'moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EditPost from '../EditPost/EditPost'

const Post = styled.li`
  padding: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background-color: white;

  :not(:first-child) {
    margin-top: 15px;
  }

  img {
    height: 40px;
  }
`
const Controls = styled.div`
  display: flex;
  justify-content: flex-end;

  a {
    margin-left: 10px;
    font-size: inherit;
    padding: 10px;
    cursor: pointer;
    color: white;
    background-color: #ff0000;
    text-decoration: none;
  }
`
const PostName = styled.div`
  color: blue;
`
const PostContent = styled.p`
  white-space: pre-wrap;
  font-weight: bold;

  ::before {
    content: '';
    display: block;
    width: 95%;
    height: 2px;
    margin: 10px auto;
    background-color: #808080;
  }
`
const ButtonEdit = styled.button`
  font-size: inherit;
  padding: 10px;
  cursor: pointer;
  color: white;
  background-color: #7171ff;
  text-decoration: none;
`

export default function SelectedPost(props) {
  const [editMode, setEditMode] = useState(false)

  const onToggleEditMode = () => {
    setEditMode(!editMode)
  }

  const post = JSON.parse(localStorage.getItem('selectedPost'))

  const onDelete = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_POSTS}/${event.target.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (editMode) {
    return (
      <EditPost
        {...props}
        id={post.id}
        content={post.content}
        onClose={onToggleEditMode}
      />
    )
  }

  return (
    <Post>
      <img src={post.avatar} alt={post.name} />
      <PostName>{post.name}</PostName>
      <span>{moment(post.created).fromNow()}</span>
      <PostContent>{post.content}</PostContent>
      <Controls>
        <ButtonEdit onClick={onToggleEditMode}>Редактировать</ButtonEdit>
        <Link to="/" id={post.id} onClick={onDelete}>
          Удалить
        </Link>
      </Controls>
    </Post>
  )
}
