import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

export default function SelectedPost() {
  const post = JSON.parse(localStorage.getItem('selectedPost'))

  const onDelete = async (event) => {
    try {
      const response = await fetch(`http://localhost:7777/posts/${event.target.id}`, {
        method: 'DELETE',
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
      <img src={post.avatar} alt={post.name} />
      <PostName>{post.name}</PostName>
      <span>{moment(post.created).fromNow()}</span>
      <PostContent>{post.content}</PostContent>
      <Controls>
        <button>CHANGE</button>
        <Link to="/" id={post.id} onClick={onDelete}>
          Удалить
        </Link>
      </Controls>
    </Post>
  )
}
